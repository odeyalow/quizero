'use client';

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import SearchField from "../ui/searchField";
import NavLink from "../ui/navLink";
import Button from "../ui/button";
import MenuOpenButton from "../ui/menuOpenButton";
import MenuCloseButton from "../ui/menuCloseButton";

const Header = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuStyles = showMenu ? 'max-lg:right-0' : 'max-lg:left-[100%]';

    useEffect(() => {
        document.body.style.overflowY = showMenu ? 'hidden' : 'scroll';
    }, [showMenu]);

    const handleMenu = () => setShowMenu(!showMenu);
    
    return (
        <header>
            <nav className="flex gap-[5rem] py-[1rem] max-md:gap-[1.5rem]">
                <Link href="/" className="flex items-center gap-[1rem] shrink-0">
                    <Image
                    src='/images/logo.png'
                    width={40}
                    height={40}
                    alt="Logo"></Image>
                    <span className="text-[2rem] font-bold">Quizero</span>
                </Link>
                <SearchField />
                <div className={`
                        flex gap-[5rem] items-center z-10
                        max-lg:h-full max-lg:flex-col max-lg:fixed max-lg:bg-dark-2 max-lg:top-0 max-lg:p-[5rem] ${menuStyles}
                    `}>
                    <MenuCloseButton onClick={handleMenu} />
                    <NavLink href="/">Главная</NavLink>
                    <NavLink href="create-quiz"> Создать</NavLink>
                    <NavLink href="discover">Исследовать</NavLink>
                </div>
                <div className="flex gap-[1.5rem]">
                    <Button type="dark">Войти</Button>
                    <MenuOpenButton onClick={handleMenu}/>
                </div>
            </nav>
        </header>
    );
}
 
export default Header;