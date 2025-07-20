'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
    children: React.ReactNode;
    href: string;
    textColor?: string;
}

const NavLink:React.FC<NavLinkProps> = ({ children, href, textColor }) => {
    const pathname = usePathname();

    const linkStyles = pathname === href ? 'text-yellow-1' : `${textColor} max-lg:text-light-2`;

    return (
        <Link className={`text-nowrap text-[2rem] font-regular hover:text-yellow-1 ${linkStyles}`} href={href}>{children}</Link>
    );
}
 
export default NavLink;