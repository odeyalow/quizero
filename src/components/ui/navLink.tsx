'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
    children: React.ReactNode;
    href: string;
}

const NavLink:React.FC<NavLinkProps> = ({ children, href }) => {
    const pathname = usePathname();

    const linkStyles = pathname === href ? 'text-yellow-1' : 'max-lg:text-light-2';

    return (
        <Link className={`text-[2rem] hover:text-yellow-1 ${linkStyles}`} href={href}>{children}</Link>
    );
}
 
export default NavLink;