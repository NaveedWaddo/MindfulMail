import { Account } from "@/lib/account";
import { db } from "@/server/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { accountId, userId } = await req.json();
  if (!accountId || userId) {
    return NextResponse.json(
      { error: "Missing accountId or userId" },
      { status: 400 },
    );
  }

  const dbAccount = await db.account.findUnique({
    where: {
      id: accountId,
      userId,
    },
  });

  if (!dbAccount)
    return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const account = new Account(dbAccount.accessToken);

  const responce = await account.performInitialSync();
  if (!responce) {
    return NextResponse.json(
      { error: "Failed to perform intial sync" },
      { status: 500 },
    );
  }

  const { emails, deltaToken } = responce;

  await db.account.update({
    where: {
      id: accountId,
    },
    data: {
      nextDeltaToken: deltaToken,
    },
  });

  // await syncEmailsToDatabase(emails);

  console.log("sync completed", deltaToken);
  return NextResponse.json({ success: true }, { status: 200 });
};
