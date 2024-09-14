import prisma from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    console.log('Get request started')
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log('checking user existance')
    if (!user || user.id === null || user === null) {
        throw new Error('something went wrong. user does not exist')
    }
    console.log('checking user in db')
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });
    console.log('checking user in db done')
    if (!dbUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? '',
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        });
        console.log('user created')

    }
    else {
        console.log('user already exist')
    }
    console.log('redirecting to dashboard')



    return NextResponse.redirect(process.env.DASHBOARD!);
}