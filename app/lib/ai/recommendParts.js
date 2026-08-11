import "server-only"

import { generateText } from 'ai';
//import { githubModels } from "./githubModels"; //Easily switch between Groq and OpenAI
import { groqModels } from "./groqModels";
import { partRecommendationSchema } from "./part-recommendation-schema";

const SYSTEM_PROMPT = `
    You are an expert automotive parts recommendation assistant.
    The user wants compatible or similar parts for a single selected garage item.


    Rules:
        -Recommend atleast 2 parts, but no more than 4.
        -Do not repeat items already in the user's description or part list.
        -Return only a valid JSON object matching the schema.
        -Include title, description, reason, category, and parts.
`.trim()

export async function recommendParts(parts) {
    const selectedItem = parts.find(
        (part) => part && typeof part == "object"
    );

    if (!selectedItem) {
        throw new Error("A single garage item must be provided to recommend parts.");
    }

    function simplifyString(value) {
        if (typeof value !== "string") {
            return value;
        }

        return value.length > 150 ? value.slice(0, 150) + "..." : value;
    }

    function compactItem(item) {
        if (!item || typeof item !== "object") {
            return item;
        }

        var compact = { type: item.type || item.category || "unknown" };
        ["year", "make", "model", "name", "brand", "size", "finish", "price", "extraInfo"].forEach(function(key) {
            var value = item[key];
            if (value == null) {
                return;
            }
            if (typeof value == "string") {
                compact[key] = simplifyString(value);
            } else {
                compact[key] = value;
            }
        });

        return compact;
    }

    var simplifiedItem = compactItem(selectedItem);
    var prompt = "Selected garage item: " + JSON.stringify(simplifiedItem) + ". Return only a single JSON object that matches the schema.";

    function parseJson(text) {
        var firstBrace = text.indexOf('{');
        var lastBrace = text.lastIndexOf('}');
        var jsonText = text;

        if (firstBrace >= 0 && lastBrace > firstBrace) {
            jsonText = text.slice(firstBrace, lastBrace + 1);
        }

        return JSON.parse(jsonText);
    }

    try {
        const result = await generateText({
            model: groqModels("llama-3.1-8b-instant"),
            system: SYSTEM_PROMPT,
            prompt,
            maxOutputTokens: 500,
            temperature: 0,
        });

        var output = result.output;
        if (output == null) {
            output = result.text;
        }

        if (typeof output == "string") {
            output = parseJson(output);
        }

        if (output && output.part_recommendation) {
            output = output.part_recommendation;
        }

        if (!output || typeof output != "object") {
            throw new Error("Invalid recommendation output");
        }

        if (!output.category) {
            output.category = "General";
        }

        return partRecommendationSchema.parse(output);
    } catch (error) {
        throw error;
    }
}
