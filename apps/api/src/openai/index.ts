import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// async function getOpenAI() {
//   const response = await openai.listEngines();
//   console.dir(response.data, { depth: null });
// }

// getOpenAI();

type CompletionChoice = {
  text: string;
  index: number;
  // logprobs: {
  //   token_logprobs: string[];
  //   top_logprobs: string[];
  //   text_offset: number[];
  // };
  logprobs: null;
  finish_reason: string;
};

type CompletionUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

type Completion = {
  id: string;
  object: string;
  model: string;
  choices: CompletionChoice[];
  usage: CompletionUsage;
};

export async function createCompletion({ text }): Promise<Completion> {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: text,
    temperature: 0.2,
    n: 3,
    max_tokens: 500,
    // stop: 500,
  });

  // console.log(completion.data);
  // console.log(completion.data.choices.map((choice) => ({ text: choice.text })));

  // return completion.data.choices.map((choice) => ({ text: choice.text }));
  return completion.data as unknown as Completion;
}

// tell me a story about a chicken who wants to go to antartica
// createCompletion({
//   // text: 'tell me a story about a chicken who wants to go to antartica',
//   text: 'tell me joke about superman',
// });
