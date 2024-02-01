import { z } from "zod";

export const questionSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters long",
    }).max(130),
    explanation: z.string().min(100),
    tags: z.array(z.string().min(1).max(5)).min(1).max(5),
});