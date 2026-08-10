import "server-only"

import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const openaiToken = process.env.OPENAI_API_KEY;

if (!openaiToken) {
  throw new Error("OPENAI_API_KEY is not configured");
}

export const githubModels = createOpenAICompatible({
  name: "openai-compatible",
  apiKey: openaiToken,
  baseURL: "https://api.openai.com/v1",
  supportsStructuredOutputs: true,
});