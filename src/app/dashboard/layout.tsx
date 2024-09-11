import Header from '@/components/dashboard/Header';
import SideBar from '@/components/dashboard/Sidebar';
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}


export default function DashBoardLayout({ children }: Props) {
    return (
        <div>
            <section className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>

                <SideBar />
                <div>
                    <Header />
                    <main>
                        {children}
                    </main>
                </div>


            </section>
        </div>
    )
}