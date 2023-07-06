import { defineCollection, z } from "astro:content";


export const collections = {
    post: defineCollection({
        type: "content",
        schema: z.object({
            title: z.string(),
            description: z.string()
        })

    })
}