import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { DISCORD_BOT_TOKEN } from "../config";
import { PreseterArgs, PreseterResponse } from "../util/stubs";

export const sendMessageInChannel = async ({
  channelId,
  message,
}: PreseterArgs): Promise<PreseterResponse> => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });
  if (!client) throw "no client";

  try {
    await client.login(DISCORD_BOT_TOKEN);
    const channel = await client.channels.fetch(channelId);
    await (channel as TextChannel).send(message);
    client.destroy();

    return { status: "success" };
  } catch (error) {
    console.error("Error:", error);
    return { status: "error", error };
  }
};
