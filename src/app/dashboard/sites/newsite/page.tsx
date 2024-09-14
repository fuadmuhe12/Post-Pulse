'use client'
import { CreateSiteAction } from '@/app/utils/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { siteSchema } from '@/app/utils/zodSchemas'
import { cn } from '@/lib/utils'
type Props = {}

export default function NewSitePage({ }: Props) {
    const [lastResult, actions] = useFormState(CreateSiteAction, undefined)
    const [form, fields] = useForm({
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: siteSchema })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
        lastResult

    })
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
                <form id={form.id} onSubmit={form.onSubmit} action={actions}>
                    <CardContent>
                        <div className='flex flex-col gap-y-6'>
                            <div className='flex flex-col gap-2'>
                                <Label>Site Name</Label>
                                <Input name={fields.name.name} key={fields.name.key} defaultValue={fields.name.initialValue} placeholder='Site Name' className={cn({
                                    'focus-visible:ring-red-500': fields.name.errors,

                                })} />
                                <p className='text-red-500 text-sm'>{fields.name.errors}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label>Subdirectory</Label>
                                <Input name={fields.subdirectory.name} key={fields.subdirectory.key} defaultValue={fields.subdirectory.initialValue} placeholder='Subdirectory' className={cn({
                                    'focus-visible:ring-red-500': fields.subdirectory.errors
                                })} />
                                <p className='text-red-500 text-sm'>{fields.subdirectory.errors}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label>Description</Label>
                                <Textarea name={fields.description.name} key={fields.description.key} defaultValue={fields.description.initialValue} placeholder='Small Description for your site' className={cn({
                                    'focus-visible:ring-red-500': fields.description.errors
                                })} ></Textarea>
                                <p className='text-red-500 text-sm'>{fields.description.errors}</p>

                            </div>
                        </div>
                        <p className='text-red-500 text-sm'>{form.errors}</p>
                    </CardContent>
                    <CardFooter>
                        <Button type='submit'>Submit</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}