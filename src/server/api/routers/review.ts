import { log } from "next-axiom";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createPrompt = (
  code: string,
  language: string,
  reviewPrompt?: string
): string => {
  const preamble = `You are an experienced maintainer of a ${language} codebase who provides code reviews.
The following code is submitted for review:
\`\`\`
${code}
\`\`\`

${
  reviewPrompt
    ? `Provide a critical review of this code with the following objective, and please include code snippets to explain what the code should look like if providing suggestions: ${reviewPrompt}:`
    : "Please give a critical review of this code. If requesting suggestions, please include code snippets to explain what the code should look like.\nReview"
}
`;
  return preamble;
};

export const reviewRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        codeBlock: z.string(),
        reviewPrompt: z.string().optional(),
        temperature: z
          .number()
          .min(0.0, "temperature cannot be less than 0")
          .max(1.0, "temperature cannot be greater than 1.0"),
        numReviews: z
          .number()
          .min(1, "cannot have less than 1 review")
          .max(10, "cannot have more than 10 reviews"),
        language: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { codeBlock, language, numReviews, temperature, reviewPrompt } =
        input;
      const prompt = createPrompt(codeBlock, language, reviewPrompt);
      log.info("received request to create a review", {
        input,
        prompt,
      });
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 1000,
          n: numReviews,
          temperature: temperature,
        });
        return completion.data.choices;
      } catch (e) {
        log.error("response from openai failed", {
          input: input,
          prompt: prompt,
          error: e,
        });
        throw new Error("failed to get response from OpenAI");
      }
    }),
});
