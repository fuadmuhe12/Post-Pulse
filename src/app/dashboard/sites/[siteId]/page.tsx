import { GetPostData } from '@/app/utils/actions'
import { Button } from '@/components/ui/button'
import { Book, BookAIcon, FileIcon, PlusCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        siteId: string
    }
}

export default async function DynamicSite({ params }: Props) {
    const postData = await GetPostData(params.siteId);
    return (
        <>
            <div className='flex justify-end gap-4'>
                <Button asChild variant={'secondary'}><Link href={'#'}><Book className='size-5 mr-2' />View Blog</Link></Button>
                <Button asChild variant={'secondary'}><Link href={'#'}><Settings /></Link></Button>
                <Button asChild><Link href={`${params.siteId}/createArticle`} className=''><PlusCircle className='size-5 mr-2' /> Create Article</Link></Button>
            </div>

            {
                postData.length === 0 || postData === undefined ? (<div className='flex justify-center flex-1 items-center bg-muted/20 border border-dashed flex-col border-border p-8 pt-0 animate-in fade-in-50 text-center'>
                    <div className='size-20 flex justify-center items-center bg-primary/10 rounded-full'>
                        <FileIcon className='size-10 text-primary' />
                    </div>
                    <h2 className='mt-6 font-semibold text-xl'>You don&apos;t have any Sites created</h2>
                    <p className='mt-2 mb-8 text-muted-foreground max-w-sm mx-auto leading-tight'>You currently dont have any Sites. Please create some so that you can
                        see them right here!
                    </p>
                    <Button asChild>
                        <Link href={'sites/newsite'} className='flex'>
                            <PlusCircle className='mr-2' /> Create Site
                        </Link>
                    </Button>
                </div>) : (
                    <h1>Posts exists</h1>
                )
            }
        </>
    )
}