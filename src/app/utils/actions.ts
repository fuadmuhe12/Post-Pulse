'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { postSchema, siteCreationSchema, siteImageUploadSchema, siteSchema } from "./zodSchemas";
import prisma from "./db";
import { Podcast } from "lucide-react";
import { title } from "process";
import type { post } from "@prisma/client";
export async function GetUser() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        redirect('/api/auth/login')
    }
    return user
}
export async function CreateSiteAction(prevState: any, fromData: FormData) {
    const user = await GetUser();
    const submission = await parseWithZod(fromData, {
        async: true,
        schema: await siteCreationSchema({
            IssubdirectoryUnique: async () => {
                const site = await prisma.site.findUnique({
                    where: {
                        subdirectory: fromData.get('subdirectory') as string
                    }
                });
                return site ? false : true
            }
        }),
    })
    if (submission.status !== "success") {
        console.log('error from site creation_______________')
        return submission.reply()
    }
    const validatedData = submission.value;

    console.log('data has been validated back end________________')
    try {
        const responce = await prisma.site.create({
            data: {
                description: validatedData.description,
                name: validatedData.name,
                subdirectory: validatedData.subdirectory,
                userId: user.id
            }
        });
    }
    catch {
        return submission.reply(
            {
                formErrors: ['failed to add']
            }
        )
    }

    return redirect('/dashboard/sites')
}

export async function GetSiteData() {

    const user = await GetUser();
    const siteData = await prisma.site.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc"
        }

    })

    return siteData
}

export async function GetPostData(siteId: string, { take = 5, skip = 0 }: { take: number, skip: number }) {
    try {
        const user = await GetUser();
        const Jump = take * skip
        const PostData = await prisma.post.findMany({
            where: {
                userId: user.id,
                siteId: siteId
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: take,
            skip: Jump,
        });
        console.log(PostData)
        return PostData;
    } catch (error) {
        return []
    }
}
export async function GetMaxSkip(siteId: string, take: number) {
    const user = await GetUser();
    const PostData = await prisma.post.findMany({
        where: {
            userId: user.id,
            siteId: siteId
        },
    });
    const val = (PostData.length / take)

    const maxSkip = Math.floor(val - 0.0001)
    return maxSkip
}

export async function CreatePostActions(prevState: any, formData: FormData) {
    const user = await GetUser();
    const submission = parseWithZod(formData, { schema: postSchema })
    if (submission.status !== 'success') {
        return submission.reply()
    }

    const validatedData = submission.value;
    let siteId;
    try {
        siteId = formData.get('siteId') as string
    } catch (error) {
        return submission.reply({
            formErrors: ['Site is not found']
        })
    }
    try {
        const responce = await prisma.post.create({
            data: {
                image: validatedData.coverImage,
                postContent: JSON.parse(validatedData.postContent),
                slug: validatedData.slug,
                smallDescription: validatedData.smallDescription,
                title: validatedData.title,
                siteId: siteId,
                userId: user.id,
            }
        });




    } catch (error) {
        return submission.reply({
            formErrors: ['failed to create Article', `${error}`]
        })

    }
    return redirect(`/dashboard/sites/${siteId}`)
}

export async function IsSlugExist(slug: string, id?: string) {
    await GetUser()
    const post = await prisma.post.findFirst({
        where: {
            slug: slug,
        }
    })

    return post ? true : false
}

export async function GetPostById(articleId: string) {
    const user = await GetUser();
    const article = await prisma.post.findUnique({
        where: {
            id: articleId,
            userId: user.id
        }
    });
    if (!article) {
        return notFound();
    }
    return article;
}

export async function UpdatePostActions(prevState: any, formData: FormData) {
    const user = await GetUser();
    const submission = parseWithZod(formData, { schema: postSchema })
    if (submission.status !== 'success') {
        return submission.reply()
    }
    const validatedData = submission.value;
    let postId;
    try {
        postId = formData.get('postId') as string
    } catch (error) {
        return submission.reply({
            formErrors: ['Post is not found']
        })
    }
    let responce: post;
    try {
        responce = await prisma.post.update({
            data: {
                image: validatedData.coverImage,
                postContent: JSON.parse(validatedData.postContent),
                slug: validatedData.slug,
                smallDescription: validatedData.smallDescription,
                title: validatedData.title,
            },
            where: {
                id: postId,
                userId: user.id
            }
        });
    } catch (error) {
        return submission.reply({
            fieldErrors: {
                slug: ['Slug already taken']
            }
        })
    }
    return redirect(`/dashboard/sites/${responce.siteId}`)
}

export async function DeletePostActions(formData: FormData) {
    console.log('started delete action')
    const user = await GetUser();
    let postId;
    let siteId;
    console.log('got user')
    try {
        postId = formData.get('postId') as string
        siteId = formData.get('siteId') as string
    } catch (error) {
        return notFound();
    }
    try {
        await prisma.post.delete({
            where: {
                id: postId,
                userId: user.id
            }
        });
        console.log('deleted ser')
    } catch (error) {
        return notFound();
    }
    return redirect(`/dashboard/sites/${siteId}`)
}

export async function UpdateSiteImageAction(prevState: any, formData: FormData) {
    const user = await GetUser();
    const submission = parseWithZod(formData, { schema: siteImageUploadSchema })

    if (submission.status !== 'success') {
        return submission.reply(
            {
                formErrors: ['failed to update image']
            }
        );
    }
    const validatedData = submission.value;
    let siteId;
    try {
        siteId = formData.get('siteId') as string
    } catch (error) {
        return submission.reply({
            formErrors: ['Site is not found']
        })
    }
    try {
        const responce = await prisma.site.update({
            data: {
                imageUrl: validatedData.imageUrl
            },
            where: {
                id: siteId,
                userId: user.id
            }
        })
    } catch (error) {
        return submission.reply({
            formErrors: ['failed to update image']
        })
    }
    return submission.reply()
}


export async function GetSiteImage(siteId: string) {
    const user = await GetUser();
    try {
        const site = await prisma.site.findUnique({
            where: {
                id: siteId,
                userId: user.id
            },
            select: {
                imageUrl: true
            }
        });
        if (!site) {
            return notFound();
        }
        return site.imageUrl;

    } catch (error) {
        return null;
    }
}


export async function DeleteSiteAction(formData: FormData) {
    const user = await GetUser();
    let siteId;
    try {
        siteId = formData.get('siteId') as string
    } catch (error) {
        return notFound();
    }
    try {
        await prisma.site.delete({
            where: {
                id: siteId,
                userId: user.id
            }
        });
    } catch (error) {
        return notFound();
    }
    return redirect('/dashboard/sites')
}


export async function GetSiteAndPostData() {
    const user = await GetUser();
    try {
        const [siteData, PostData] = await Promise.all([
            prisma.site.findMany({
                where: {
                    userId: user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 3
            }),
            prisma.post.findMany({
                where: {
                    userId: user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 3
            })
        ]);
        return { siteData, PostData }
    } catch (error) {
        return { siteData: [], PostData: [] }
    }
}