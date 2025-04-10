import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { NEYNAR_KEY, NEYNAR_SIGNER_UUID } from "../config";
import { PresenterArgs, PresenterResponse } from "../util/stubs";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

export const sendMessage = async ({
  channelId,
  message,
}: PresenterArgs): Promise<PresenterResponse> => {
  const config = new Configuration({
    apiKey: NEYNAR_KEY!,
  });
  const client = new NeynarAPIClient(config);

  if (!NEYNAR_SIGNER_UUID) {
    throw new Error("NEYNAR_SIGNER_UUID is not defined");
  }

  if (!NEYNAR_KEY) {
    throw new Error("NEYNAR_API_KEY is not defined");
  }
  if (!client) {
    throw new Error("client is not defined");
  }

  try {
    await client.publishCast({
      signerUuid: NEYNAR_SIGNER_UUID,
      text: message,
    });
    console.log("Cast published successfully");

    return { status: "success" };
  } catch (error) {
    if (isApiErrorResponse(error)) {
      console.log(error.response.data);
      return { status: "error", error: error.response.data };
    } else {
      console.error("Error:", error);
      return { status: "error", error };
    }
  }
};
