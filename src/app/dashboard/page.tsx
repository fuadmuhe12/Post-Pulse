import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ucs2 } from 'punycode';
import React from 'react'

type Props = {}

export default async function DashBoard({ }: Props) {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    return (
        <div>DashBoard</div>
    )
}