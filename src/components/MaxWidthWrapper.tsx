import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    className?: string
}

export default function MaxWidthWrapper({ children, className }: Props) {
    return (
        <div className={cn('max-w-screen-2xl mx-auto lg:px-10 px-2', className)}>
            {children}
        </div>
    )
}