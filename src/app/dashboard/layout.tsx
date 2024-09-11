import Header from '@/components/Header';
import SideBar from '@/components/Sidebar'
import { DollarSign, Globe, Home, LucideProps } from 'lucide-react';
import React, { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

type Props = {
    children: ReactNode
}
type NavItem = {
    name: string
    href: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
export const navLinks: NavItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Sites",
        href: "/dashboard/sites",
        icon: Globe,
    },
    {
        name: "Pricing",
        href: "/dashboard/pricing",
        icon: DollarSign,
    },
];
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