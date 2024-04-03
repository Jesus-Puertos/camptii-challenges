import { defineCollection,z } from "astro:content";


const blog = defineCollection({
    type: "content",
    schema:z.object({
        heroImage: z.string(),
        title: z.string(),
        pubDate: z.coerce.date(),
        tags: z.string().array(),
    })
});

const beginner = defineCollection({
    type: "content",
    schema:z.object({
        heroImage: z.string(),
        title: z.string(),
        pubDate: z.coerce.date(),
        tags: z.string().array(),
        illustration: z.string(),
    })
});


export const collections = {blog, beginner}