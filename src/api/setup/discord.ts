import { Client, GatewayIntentBits, TextChannel } from "discord.js";

import express from "express";
import { CLIENT_ID, DISCORD_BOT_TOKEN } from "../../config";

const router = express.Router();

type SetupDiscordResponse = {
  invite: string;
};

type CheckDiscordResponse = {
  status: string;
};

router.get<{}, SetupDiscordResponse>("/get-invite", (req, res) => {
  const permissions = "309237733376";
  const invite = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=${permissions}integration_type=0&scope=bot`;
  res.json({
    invite,
  });
});

router.get<{ channelId: string }, CheckDiscordResponse>(
  "/check-status/:channelId",
  async (req, res, next) => {
    const channelId = req.params.channelId;

    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
    if (!client) throw "no client";

    try {
      await client.login(DISCORD_BOT_TOKEN);
      const channel = await client.channels.fetch(channelId);
      await (channel as TextChannel).send(`🤖 I got the job?!?!?!`);
      client.destroy();

      res.json({ status: "success" });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
);

export default router;
