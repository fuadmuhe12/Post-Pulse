import { z } from 'zod'

export const siteSchema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(1).max(155),
    subdirectory: z.string().min(1).max(40)
})

export const postSchema = z.object({
    title: z.string().min(1).max(20),
    slug: z.string().min(1).max(190),
    smallDescription: z.string().min(1).max(200),
    postContent: z.string().min(1),
    coverImage: z.string().min(1)
})

export const siteImageUploadSchema = z.object({
    imageUrl: z.string().min(1)
})

