import express from "express";
import {
  buildPrompt,
  callLlm,
  findChannelContext,
  findCharacterContext,
  findOrg,
  findPersona,
  presenterFunctions,
  PresenterTypes,
} from "../util/stubs";

const router = express.Router();

type TalkResponse = { message: string };

router.post<{}, TalkResponse>("/", async (req, res, next) => {
  console.log("FOUND");
  try {
    const { channelId, source } = req.body;
    // todo: probably lots of validation
    console.log("req body", req.body);

    let validSource: PresenterTypes = source || "discord";

    console.log("validSource", validSource);

    if (!validSource) throw "missing valid source";

    if (validSource === "discord" && !channelId) throw "missing channelId";

    // load data to identify persona/org/channel/ect..
    // todo: what is the most generic input we can take here to identify needed db elements
    // find org, persona, communication channel (discord/farcaster/adminui), ect...
    // maybe api requires a source field int eh body so we know where to spit back at
    const org = await findOrg(channelId);
    console.log("org", org);
    const persona = await findPersona(channelId);
    const channelType = validSource;
    // const channelType = "adminUi";

    // load data to seed llm context

    const characterContext = await findCharacterContext(persona.id);
    const channelContext = await findChannelContext(persona.id, channelId);
    // how will we get other data related to functions the persona has
    // and how is the cirrect function selected?

    const prompt = await buildPrompt(
      channelContext.context,
      characterContext.context,
      persona
    );

    const llmResponse = await callLlm(prompt.prompt);

    // todo: do we save the message for future channel chunks?

    // now need to determin the method to return/present the data
    // adminui just returns the message in res for the chat window
    // discord triggers the respons with discord.js

    const presenterFn = presenterFunctions[channelType];

    await presenterFn({ channelId, message: llmResponse.reply });

    // ok to awlays return this?
    res.json({ message: llmResponse.reply });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
});

export default router;
