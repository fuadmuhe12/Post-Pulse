import { FileIcon, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
    tittle: string
    description: string
    buttonText: string
    buttonHref: string
    className?: string
}


export default function EmptyStateCard({ buttonHref, buttonText, description, tittle, className }: Props) {
    return (
        (<div className={cn('flex justify-center flex-1 items-center bg-muted/20 border border-dashed flex-col border-border p-8 animate-in fade-in-50 text-center', className)}>
            <div className='size-20 flex justify-center items-center bg-primary/10 rounded-full'>
                <FileIcon className='size-10 text-primary' />
            </div>
            <h2 className='mt-6 font-semibold text-xl'>{tittle}</h2>
            <p className='mt-2 mb-8 text-muted-foreground max-w-sm mx-auto leading-tight'>{description}
            </p>
            <Button asChild>
                <Link href={buttonHref} className='flex'>
                    <PlusCircle className='mr-2' /> {buttonText}
                </Link>
            </Button>
        </div>)
    )
}