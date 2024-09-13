import Header from '@/components/dashboard/Header';
import SideBar from '@/components/dashboard/Sidebar';
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}


export default function DashBoardLayout({ children }: Props) {
    return (
        <div className=''>
            <section className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
                <SideBar />
                <div className=' h-full grid grid-rows-[56px_1fr] lg:grid-rows-[60px_1fr]'>
                    <Header />
                    <main className='flex flex-col flex-1 p-4 gap-4 lg:p-6 h-full '>
                        {children}
                    </main>
                </div>


            </section>
        </div>
    )
}