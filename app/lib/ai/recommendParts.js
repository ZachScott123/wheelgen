import "server-only"

import {
    generateText,
    NoObjectGeneratedError,
    Output,
} from 'ai';

import { githubModels } from "./github-models";
import { partRecommendationSchema } from "./part-recommendation-schema";

const SYSTEM_PROMPT = `
        You are an expert automotive parts recommendation assistant.
        The user is looking for compatible or similar parts based on a single selected garage item.

        The selected item may be a vehicle, rim, accessory, or another garage part.
        Recommend 3-5 compatible or similar parts that fit the selected item.

        Rules:
        -Use only the information provided for the selected item.
        -Do not recommend parts that are already present in the provided item data.
        -Do not invent unrealistic products.
        -Return only valid JSON that matches the schema exactly.
        -Include a brief reason for the recommendation.
        -Provide a category and priority score from 0 to 10.
    `.trim()

export async function recommendParts(parts) {
    const garageInventory = parts.filter((part) =>
        part && typeof part.name === "string" &&
        part.name.trim() !== ""
    );

    if (garageInventory.length === 0) {
        throw new Error("A single garage item must be provided to recommend parts.");
    }

    const selectedItem = garageInventory[0];
    const prompt = `Selected garage item:\n${JSON.stringify(selectedItem, null, 2)}\n\nRecommend 3-5 compatible or similar parts for this item. Return only a single JSON object that matches the schema.`;

    try {
        const result = await generateText({
            model: githubModels("openai/gpt-4.1"),
            system: SYSTEM_PROMPT,
            prompt,
            output: Output.object({
                name: "part_recommendation",
                description: "Part recommendations based on a single selected garage item",
                schema: partRecommendationSchema,
            }),
            maxOutputTokens: 600,
        });

        return result.output;
    } catch (error) {
        if (NoObjectGeneratedError.isInstance(error)) {
            console.error("AI output did not match the schema", {
                cause: error.cause,
                text: error.text,
                usage: error.usage,
            });
            throw new Error("The AI returned invalid recommendation data");
        }
        throw error;
    }
}
