import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
type Props = {}

export default function NewSitePage({ }: Props) {
    return (
        <div className='flex flex-col justify-center items-center '>
            <Card className='max-w-[450px]'>
                <CardHeader>
                    <CardTitle>
                        Create Site
                    </CardTitle>
                    <CardDescription>
                        Create your Site here. Click the button below once your done...
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-2'>
                            <Label>Site Name</Label>
                            <Input placeholder='Site Name'></Input>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Subdirectory</Label>
                            <Input placeholder='Subdirectory'></Input>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Description</Label>
                            <Textarea placeholder='Small Description for your site'></Textarea>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type='submit'>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}