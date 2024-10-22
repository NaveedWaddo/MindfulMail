import { EmailMessage, SyncUpdatedResponse } from "@/types";
import axios from "axios";
import { resolve } from "path";

export class Account {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async startSync() {
    const responce = await axios.post(
      "https:/api/aurinko.io/vi/email/sync",
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          daysWithin: 2,
          bodyType: "html",
        },
      },
    );
    return responce.data;
  }

  async getUpdatedEmails({
    deltaToken,
    pageToken,
  }: {
    deltaToken?: string;
    pageToken?: string;
  }) {
    let params: Record<string, string> = {};
    if (deltaToken) params.deltaToken = deltaToken;
    if (pageToken) params.pageToken = pageToken;

    const responce = await axios.get<SyncUpdatedResponse>(
      "https://api/aurinko.io/v1/email/sync/updated",
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params,
      },
    );

    return responce.data;
  }

  async performInitialSync() {
    try {
      let syncResponce = await this.startSync();
      while (!syncResponce.ready) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        syncResponce = await this.startSync();
      }
      let storedDeltaToken: string = syncResponce.syncUpdatedToken;

      let updateedResponce = await this.getUpdatedEmails({
        deltaToken: storedDeltaToken,
      });

      if (updateedResponce.nextDeltaToken) {
        //sync has completed
        storedDeltaToken = updateedResponce.nextDeltaToken;
      }
      let allEmails: EmailMessage[] = updateedResponce.records;

      //fetch all pages if there are more
      while (updateedResponce.nextPageToken) {
        updateedResponce = await this.getUpdatedEmails({
          pageToken: updateedResponce.nextPageToken,
        });
        allEmails = allEmails.concat(updateedResponce.records);
        if (updateedResponce.nextDeltaToken) {
          //sync has ended
          storedDeltaToken = updateedResponce.nextDeltaToken;
        }
      }

      console.log(
        "initial sync completed, we have synced",
        allEmails.length,
        "emails",
      );
      //store the latest delta token for future incremental sync

      return {
        emails: allEmails,
        deltaToken: storedDeltaToken,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during sync:",
          JSON.stringify(error.response?.data, null, 2),
        );
      } else {
        console.error("Error during sync:", error);
      }
    }
  }
}
