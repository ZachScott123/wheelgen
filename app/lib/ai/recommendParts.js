import "server-only"

import { generateText } from 'ai';
import { githubModels } from "./githubModels";
import { partRecommendationSchema } from "./part-recommendation-schema";

const SYSTEM_PROMPT = `
You are an expert automotive parts recommendation assistant.
The user wants compatible or similar parts for a single selected garage item.

Return only a valid JSON object matching the schema.
Include title, description, reason, category, priority, and parts.
Use only the provided item information.
If category is unclear, use "General".
Priority must be a number from 0 to 10.
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
            model: githubModels("gpt-3.5-turbo"),
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

        if (typeof output.priority == "string") {
            var parsedPriority = parseFloat(output.priority);
            if (Number.isNaN(parsedPriority)) {
                output.priority = 0;
            } else {
                output.priority = parsedPriority;
            }
        }

        if (output.priority == null) {
            output.priority = 0;
        }

        return partRecommendationSchema.parse(output);
    } catch (error) {
        throw error;
    }
}
