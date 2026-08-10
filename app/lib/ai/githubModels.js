import "server-only"

import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const githubToken = process.env.GITHUB_MODEL_TOKEN;

if( !githubToken ) {
    throw new Error("GITHUB_MODEL_TOKEN is not configured");
}

export const githubModels = createOpenAICompatible( {
    name: "github-models",
    apiKey: githubToken,
    baseURL: "https://models.github.ai/inference",
    headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version":"2026-03-10",
    },
    supportsStructuredOutputs: true,
})