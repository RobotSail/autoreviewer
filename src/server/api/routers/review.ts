import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createPrompt = (code: string): string => {
  const preamble = `You are a talented and experienced maintainer of a major code-base who reviews code and provides helpful feedback.
The following code is submitted for review:
\`\`\`
${code}
\`\`\`

Please provide a review of the code. Include what this code does well, and what it could do better.
If proposing a change, please provide an example of how it could be improved:
`;
  return preamble;
};

export const reviewRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        codeBlock: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { codeBlock } = input;
      const prompt = createPrompt(codeBlock);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
      });
      return completion.data.choices[0]?.text;
    }),
});
