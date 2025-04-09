// import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";

const router = express.Router();

type TalkResponse = string[];

router.post<{}, TalkResponse>("/", (req, res) => {
  //  body has server, channel, source, message
  //  pretend find persona
  //  pretend load persona context
  //  pretend load context message chunk
  //  pretend find function based on persona or whatever?
  //  make llm prompt with all this
  //  create pretend message

  // const jsonData = req.body;

  // if (jsonData.apiKey !== process.env.API_KEY) {
  //   throw "missing api key";
  // }
  // console.log("req body", jsonData);

  // const channelId = "687036812769755137";

  // const client = new Client({
  //   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  // });
  // if (!client) throw "no client";

  // client.once("ready", async () => {
  //   console.log(`Logged in as ${client.user?.tag}!`);

  //   try {
  //     // Get the channel
  //     const channel = await client.channels.fetch(channelId);

  //     if (!channel) {
  //       console.error("Channel not found!");
  //       throw "Channel not found!";
  //     }

  //     const animal = jsonData.message || "cat";

  //     // Send the message
  //     await (channel as TextChannel).send(
  //       `MEEEOOOOOOOOWWWWWW, I'm a ${animal} 🤖`
  //     );
  //     console.log("Message sent successfully!");

  //     // Optional: Disconnect the bot after sending the message
  //     client.destroy();
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // });

  // client
  //   .login(process.env.DISCORD_BOT_TOKEN)
  //   .catch((err) => console.error("Failed to login:", err));

  res.json(["🤖", "😳", "🤖"]);
});

export default router;
