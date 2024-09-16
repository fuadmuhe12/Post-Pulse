import { conformZodMessage } from '@conform-to/zod'
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



export async function siteCreationSchema(options: {
    IssubdirectoryUnique?: () => Promise<boolean>
}) {
    return z.object(
        {
            subdirectory: z.string().min(1).max(40).regex(/^[a-z]+$/, 'subdirectory must in lower case latters').transform((val) => val.toLowerCase()).pipe(z.string()
                .superRefine((email, ctx) => {
                    if (typeof options.IssubdirectoryUnique !== 'function') {
                        ctx.addIssue({
                            code: 'custom',
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true
                        })
                        return;
                    }

                    return options.IssubdirectoryUnique().then((IsUnique) => {

                        if (!IsUnique) {
                            ctx.addIssue({
                                code: 'custom',
                                message: 'subdirectory already taken',
                            })
                        }
                    })
                })),
            name: z.string().min(1).max(40),
            description: z.string().min(1).max(155),

        }
    )
}