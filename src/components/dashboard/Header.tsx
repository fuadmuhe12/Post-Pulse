import React from 'react'
import { ThemeToggle } from '../ThemeToggle'
import { CircleUser } from 'lucide-react'
import { Button } from '../ui/button'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type Props = {}

export default function Header({ }: Props) {
    return (
        <header className='flex h-14  items-center bg-muted/40 gap-4 border-border border-b px-4 lg:h-[60px] lg:px-6'>
            <div className='ml-auto flex items-center gap-x-5'>
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem >
                            <LogoutLink>Log out</LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}