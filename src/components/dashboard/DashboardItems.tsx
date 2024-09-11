'use client'
import { navLinks } from "@/constants/navLinks"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'

type Props = {}

export default function DashboardItems({ }: Props) {
    const path = usePathname()
    return (
        <>
            {navLinks.map((item, index) => {
                return (
                    <Link href={item.href} key={item.name} className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70',
                        {
                            'bg-muted text-primary': path === item.href,
                            'text-muted-foreground bg-none': path !== item.href
                        }
                    )}>
                        <item.icon className="size-5" strokeWidth={2.5} />
                        {item.name}
                    </Link>
                )

            })}
        </>
    )
}