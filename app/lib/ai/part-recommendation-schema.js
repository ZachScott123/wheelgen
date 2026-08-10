import { z } from 'zod';

export const partRecommendationSchema = z.object({
    title: z.string(),
    description: z.string(),
    reason: z.string(),
    category: z.string(),
    parts: z.array(
        z.object({
            name: z.string(),
            category: z.string().optional(),
            brand: z.string().optional(),
            details: z.string().optional(),
            score: z.number().min(0).max(10).optional(),
        })
    ).min(1).max(10),
});
