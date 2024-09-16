import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../../public/logo.svg'
import DashboardItems from './DashboardItems'

type Props = {}

export default function SideBar({ }: Props) {
    return (
        <div className=' hidden h-screen sticky top-0 md:block border-r border-border bg-muted/40'>
            <div className="flex h-full  flex-col gap-2">
                <div className="topSideBar flex h-14 items-center border-border border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href={'/'} className='flex font-semibold gap-2 items-center'>
                        <Image src={Logo} className='size-8' alt='Logo' />
                        <h3 className='text-2xl'>Post<span className='text-primary'>Pulse</span></h3>
                    </Link>
                </div>
                <div className='flex-1'>
                    <nav className='grid items-start px-2 font-medium lg:px-4'>
                        <DashboardItems />
                    </nav>
                </div>
            </div>


        </div>
    )
}