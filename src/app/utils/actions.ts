'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "./zodSchemas";
import { allowedNodeEnvironmentFlags } from "process";
import prisma from "./db";
import { record } from "zod";
import { use } from "react";
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
    const submission = parseWithZod(fromData, { schema: siteSchema, })
    if (submission.status !== "success") {
        return submission.reply()
    }
    const validatedData = submission.value;
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

export async function GetPostData(siteId: string) {
    const user = await GetUser();
    const PostData = await prisma.post.findMany({
        where: {
            userId: user.id,
            siteId: siteId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return PostData;
}