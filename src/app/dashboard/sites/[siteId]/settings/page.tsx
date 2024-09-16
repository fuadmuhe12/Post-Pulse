import { GetSiteImage } from '@/app/utils/actions'
import ImageUploadForm from '@/components/dashboard/form/ImageUploadForm'
import SiteDeleteForm from '@/components/dashboard/form/SiteDeleteForm'
import SubmitButton from '@/components/dashboard/SubmitButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        siteId: string
    }
}

export default async function SiteSettingPage({
    params
}: Props) {
    let curSiteImage: string | null = await GetSiteImage(params.siteId)
    return (
        <>
            <div className='flex items-center gap-2'>
                <Button variant={'outline'} size={'icon'} asChild>
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className='size-4' />
                    </Link>
                </Button>
                <h1>Site Settings</h1>
            </div>

            <div className='grid gap-5 justify-center'>
                <Card className=''>
                    <CardHeader>
                        <CardTitle>
                            Update Cover Image
                        </CardTitle>
                        <CardDescription>
                            Update the cover image for your site. The cover image will be displayed on the homepage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImageUploadForm siteId={params.siteId} currentImageUrl={curSiteImage ?? ''} />
                    </CardContent>
                </Card>
                <Card className='border-destructive bg-destructive/10 '>
                    <CardHeader>
                        <CardTitle className='text-red-500'>
                            Denger Zone
                        </CardTitle>
                        <CardDescription className=''>
                            click the button below to delete this site and all the articles under it.
                            Once you delete a site, there is no going back. Please be certain.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <SiteDeleteForm siteId={params.siteId} />
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}