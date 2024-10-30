import Account from "@/lib/account";
import { syncEmailsToDatabase } from "@/lib/sync-to-db";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { accountId, userId } = body;

  if (!accountId || !userId) {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  const dbAccount = await db.account.findUnique({
    where: {
      id: accountId,
      userId,
    },
  });
  if (!dbAccount) {
    return NextResponse.json({ error: "ACCOUNT_NOT_FOUND" }, { status: 404 });
  }

  const account = new Account(dbAccount.token);

  // Step 1: Perform account setup asynchronously
  account.createSubscription().catch((error) => {
    console.error("Subscription Error:", error);
  });

  // Step 2: Retrieve emails in smaller batches to prevent timeouts
  const syncResponse = await account.performInitialSync();
  if (!syncResponse) {
    return NextResponse.json({ error: "FAILED_TO_SYNC" }, { status: 500 });
  }

  const { deltaToken, emails } = syncResponse;

  // Step 3: Process emails in smaller chunks
  const batchSize = 50; // Adjust batch size to a suitable number to avoid timeouts
  for (let i = 0; i < emails.length; i += batchSize) {
    const emailBatch = emails.slice(i, i + batchSize);
    await syncEmailsToDatabase(emailBatch, accountId);
  }

  // Step 4: Update database with the latest sync token
  await db.account.update({
    where: { token: dbAccount.token },
    data: { nextDeltaToken: deltaToken },
  });

  console.log("Sync complete", deltaToken);
  return NextResponse.json({ success: true, deltaToken }, { status: 200 });
};
