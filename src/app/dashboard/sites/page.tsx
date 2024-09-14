import { GetSiteData } from '@/app/utils/actions'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileIcon, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import DefaultImage from '@public/default.png'

type Props = {}

export default async function SitesPage({ }: Props) {
    const SiteData = await GetSiteData()
    return (
        <div className='flex flex-col h-full gap-4'>
            <div className='flex justify-end w-full' >
                <Button asChild>
                    <Link href={'sites/newsite'} className='flex'>
                        <PlusCircle className='mr-2' /> Create Site
                    </Link>
                </Button>
            </div>
            {SiteData.length < 1 || SiteData === undefined ? (<div className='flex justify-center flex-1 items-center bg-muted/20 border border-dashed flex-col border-border p-8 pt-0 animate-in fade-in-50 text-center'>
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
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7'>
                    {
                        SiteData.map((site) => {
                            return (
                                <Card key={site.subdirectory} className='border-border'>
                                    <Image src={site.imageUrl ?? DefaultImage} alt={site.name} className='w-full h-[200px] rounded-lg object-cover' width={400} height={200} />
                                    <CardHeader>
                                        <CardTitle>{site.name}</CardTitle>
                                        <CardDescription>{site.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button asChild className='w-full'>
                                            <Link href={`sites/${site.id}`} >
                                                View Articles
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}