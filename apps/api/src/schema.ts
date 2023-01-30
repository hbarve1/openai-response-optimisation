import { createCompletion } from './openai';
import { prismaClient } from './prismaClient';

export const typeDefs = `#graphql
  type PrompSample {
    text: String
  }

  type PromptResponse {
    id: Int,
    text: String,

    # openAI_Id: String,
    # openAI_Object: String,
    # openAI_Model: String,
    # openAI_UsagePromptTokens: Int,
    # openAI_UsageCompletionTokens: Int,
    # openAI_UsageTotalTokens: Int,

    promptGeneratedTexts: [PromptGeneratedTextResponse],
  }

  type PromptGeneratedTextResponse {
    id: Int,
    text: String,
    textEdited: String,
    index:  Int,
    # logProbs: String,
    # finishReason: String,
    promptId: Int,
    userId: Int,
    rank: Int,
  }

  type Query {
    prompts: [PromptResponse]
    prompt(id: Int!): PromptResponse
    promptGeneratedTexts(id: Int!): [PromptGeneratedTextResponse]
    promptGeneratedText(id: Int!): PromptGeneratedTextResponse
  }

  type Mutation {
    createPrompt(text: String!): PromptResponse!
    rankPromptGeneratedText(id: Int!, rank: Int!): PromptGeneratedTextResponse!
    editPromptGeneratedText(id: Int!, textEdited: String!): PromptGeneratedTextResponse!
  }
`;

// Use this function to create a base user
async function createBaseUser() {
  const user = await prismaClient.user.create({
    data: {
      id: 1,
      email: 'stealth-edtech@edu.com',
    },
  });
  console.log('user', user);
}

// createBaseUser();

export const resolvers = {
  Query: {
    prompts: async () => {
      return prismaClient.prompt.findMany({
        where: {
          userId: 1,
        },
        select: {
          id: true,
          text: true,
          promptGeneratedTexts: true,
        },
      });
    },
    prompt: async (parent, args) => {
      const { id } = args;
      return prismaClient.prompt.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          text: true,
          promptGeneratedTexts: true,
        },
      });
    },
    promptGeneratedTexts: async (parent, args) => {
      const { id } = args;
      return prismaClient.promptGeneratedText.findMany({
        where: {
          promptId: id,
        },
        select: {
          id: true,
          text: true,
          index: true,
          promptId: true,
          userId: true,
          rank: true,
        },
      });
    },
    promptGeneratedText: async (parent, args) => {
      const { id } = args;
      return prismaClient.promptGeneratedText.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          text: true,
          index: true,
          promptId: true,
          userId: true,
          rank: true,
        },
      });
    },
  },
  Mutation: {
    createPrompt: async (parent, args) => {
      const { text } = args;
      const promptResponses = await createCompletion({ text: args.text });
      const {
        id,
        object,
        model,
        choices,
        usage: { prompt_tokens, completion_tokens, total_tokens },
      } = promptResponses;

      const res = await prismaClient.prompt.create({
        select: {
          id: true,
          text: true,
          // openAI_Id: true,
          // openAI_Object: true,
          // openAI_Model: true,
          // openAI_UsagePromptTokens: true,
          // openAI_UsageCompletionTokens: true,
          // openAI_UsageTotalTokens: true,

          promptGeneratedTexts: true,
        },
        data: {
          userId: 1,
          text,

          openAI_Id: id,
          openAI_Object: object,
          openAI_Model: model,
          openAI_UsagePromptTokens: prompt_tokens,
          openAI_UsageCompletionTokens: completion_tokens,
          openAI_UsageTotalTokens: total_tokens,

          promptGeneratedTexts: {
            create: choices.map(({ text, index, logprobs, finish_reason }) => ({
              text: text,
              logProbs: logprobs,
              finishReason: finish_reason,
              index,
              userId: 1,
            })),
          },
        },
      });

      return res;
    },
    rankPromptGeneratedText: async (parent, args) => {
      const { id, rank } = args;

      const res = await prismaClient.promptGeneratedText.update({
        where: {
          id,
        },
        data: { rank },
      });

      return res;
    },
    editPromptGeneratedText: async (parent, args) => {
      const { id, textEdited } = args;

      const res = await prismaClient.promptGeneratedText.update({
        where: {
          id,
        },
        data: { textEdited },
      });

      return res;
    },
  },
};
