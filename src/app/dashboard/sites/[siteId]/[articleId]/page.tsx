import { GetPostById } from '@/app/utils/actions'
import EditArticleForm from '@/components/dashboard/form/EditArticleForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        siteId: string;
        articleId: string;
    };
}

export default async function EditArticlePage({ params }: Props) {
    const postData = await GetPostById(params.articleId);
    return (
        <>
            <div className="flex items-center">
                <Button asChild size={"icon"} variant={"outline"} className="mr-3">
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold">Edit Article</h1>
            </div>
            <EditArticleForm post={postData} />
        </>
    )
}