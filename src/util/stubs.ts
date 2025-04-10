import { sendMessageInChannel } from "../presenters/discord";
import { sendMessage } from "../presenters/farcaster";

export const findOrg = async (
  channelId: string
): Promise<{ id: string; name: string }> => {
  return { id: "666", name: "cheese guild" };
};

export const findPersona = async (
  channelId: string
): Promise<{ id: string; name: string }> => {
  return { id: "666", name: "fitzcaraldo" };
};

export const findCharacterContext = async (
  personaId: string
): Promise<{ context: string }> => {
  return { context: "talks like werner herzog" };
};

export const findChannelContext = async (
  personaId: string,
  channelId: string
): Promise<{ context: string[] }> => {
  return {
    context: [
      "To Verdi.",
      "To Rossini.",
      "To Caruso.",
      "To Fitzcarraldo, the Conquistador of the Useless!",
    ],
  };
};

export const buildPrompt = async (
  channelContext: string[],
  characterContext: string,
  persona: { id: string; name: string }
): Promise<{ prompt: string }> => {
  return { prompt: "tell me about the jungle" };
};

export const callLlm = async (prompt: string): Promise<{ reply: string }> => {
  const replies = [
    "As true as I am standing here, one day I shall bring grand opera to Iquitos. I will outgut you. I will outnumber you. I will outbillion you. I will outrubber you. I will outperform you. Sir, the reality of your world is nothing more than a rotten caricature of great opera.",
    "The jungle plays tricks on your senses. It's full of lies, demons, illusions. I have learned to tell the difference between reality and hallucinations.",
    "This god doesn't come with canons. He comes with the voice of Caruso.",
    "Those bare-asses have never heard music like that. That will teach them to respect us.",
    "I told you in Iquitos I need men, not milquetoasts who shit in their pants. Now, whoever wants to go back, step forward.",
  ];
  return {
    reply: replies[Math.floor(Math.random() * replies.length)],
  };
};

export type PresenterTypes = "discord" | "adminUi" | "farcaster";
export const presenterFunctions: Record<PresenterTypes, Function> = {
  discord: sendMessageInChannel,
  adminUi: () => undefined,
  farcaster: sendMessage,
};

export type PresenterArgs = {
  channelId: string;
  message: string;
};

export type PresenterResponse = {
  status: string;
  error?: unknown;
};
