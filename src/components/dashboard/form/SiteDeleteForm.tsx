'use client';
import { DeleteSiteAction } from '@/app/utils/actions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import SubmitButton from '../SubmitButton'

type Props = {
    siteId: string
}

export default function SiteDeleteForm({ siteId }: Props) {
    return (
        <>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button variant='destructive'>Delete Everything</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='border-destructive border-2 '>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this site?</AlertDialogTitle>
                        <AlertDialogDescription >
                            This action cannot be undone. This will delete all the articles under this site.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={DeleteSiteAction}>
                            <Input type="hidden" name="siteId" value={siteId} />
                            <SubmitButton variant={'destructive'} name='Delete Everything' />
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}