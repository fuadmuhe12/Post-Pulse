import { DollarSign, Globe, Home, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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