'use client'
import { DeletePostActions } from '@/app/utils/actions'
import SubmitButton from '@/components/dashboard/SubmitButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        siteId: string,
        articleId: string
    }
}

export default function DeleteArticlePage({ params }: Props) {
    return (
        <div className='flex justify-center items-center h-full'>
            <Card className='border-border'>
                <CardHeader>
                    <CardTitle>Are you sure you want to delete this article?</CardTitle>
                    <CardDescription>This action cannot be undone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={DeletePostActions}>
                        <input type="hidden" name="siteId" value={params.siteId} />
                        <input type="hidden" name="postId" value={params.articleId} />
                        <div className='flex justify-around'>
                            <Button asChild>
                                <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
                            </Button>
                            <SubmitButton name='Delete Article' variant='destructive' />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}