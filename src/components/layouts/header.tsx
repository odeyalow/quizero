'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import Section from "./section";
import SearchField from "../ui/searchField";
import NavLink from "../ui/navLink";
import Button from "../ui/button";
import MenuOpenButton from "../ui/menuOpenButton";
import MenuCloseButton from "../ui/menuCloseButton";
import BaseModal from "../ui/baseModal";
import { useAuthData } from "./authProvider";
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import useGetUser from "@/hooks/useGetUser";

const Header = () => {
    const user = useAuthData();
    const userData = useGetUser(user.user?.uid);
    const { signOutUser } = useAuth();

    const pathname = usePathname();
    const router = useRouter();

    const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuStyles = showMenu ? 'max-lg:right-0' : 'max-lg:left-[100%]';
    const isAuthPage = pathname !== '/login' && pathname !== '/register';
    const { showModal, openModal, closeModal } = useModal();

    const userPfpURL = userData.data?.photoURL ?? '/images/user-pfp-placeholder.svg';

    useEffect(() => {
        document.body.style.overflowY = showMenu ? 'hidden' : 'scroll';
        document.addEventListener('click', (event) => {
            if (!dropdownRef.current?.contains(event.target as Node)) setShowProfileDropdown(false);
        })
    }, [showMenu]);

    useEffect(() => {
        setShowMenu(false);
    }, [pathname])

    const handleSignOut = () => {
        signOutUser();
        closeModal();
        router.replace('/login');
    }

    const handleMenu = () => setShowMenu(!showMenu);
    const handleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
    return (
        <>
            <header className="mb-[5rem] lg:sticky z-50 top-0 bg-light-1/30 lg:backdrop-blur-sm">
                <Section>
                    <nav className="flex justify-center gap-[5rem] py-[1rem] max-md:gap-[1.5rem] max-sm:grid max-sm:grid-cols-2">
                        <Link href="/" className="flex items-center gap-[1rem] shrink-0">
                            <Image
                            src='/images/logo.png'
                            width={40}
                            height={40}
                            alt="Logo"></Image>
                            <span className="text-[2rem] font-extrabold max-[350px]:hidden">Quizero</span>
                        </Link>
                        {
                            isAuthPage && (
                                <>
                                    <div className="w-full max-sm:row-start-2 max-sm:col-start-1 max-sm:col-end-3 max-sm:mt-[1rem]">
                                    <SearchField />
                                    </div>
                                    <div className={`
                                            flex gap-[5rem] lg:ml-[-5rem] items-center z-10
                                            max-lg:h-full max-lg:flex-col max-lg:fixed max-lg:bg-dark-2 max-lg:top-0 max-lg:p-[5rem] ${menuStyles}
                                        `}>
                                        <MenuCloseButton onClick={handleMenu} />
                                        <NavLink href="/">Главная</NavLink>
                                        <NavLink href={user.user ? '/create-quiz' : 'login'}> Создать</NavLink>
                                        <NavLink href="/categories">Категории</NavLink>
                                    </div>
                                    <div className="flex max-lg:gap-[1.5rem] max-sm:justify-end">
                                        {
                                            user.user ? (
                                            <div
                                            ref={dropdownRef}
                                            className="relative">
                                                <Image
                                                src={userPfpURL}
                                                alt="Profile Picture"
                                                width={45}
                                                height={45}
                                                onClick={handleProfileDropdown}
                                                className="
                                                object-cover
                                                translate-y-[-3px] hover:translate-y-[-5px] active:translate-y-0
                                                border-[3.5px] relative z-2 border-yellow-2 rounded-[10px] max-w-[45px] h-[45px]"
                                                />
                                                {
                                                    showProfileDropdown && (
                                                        <div className="border-gray border-[3.5px] rounded-[1.5rem] p-[2rem] bg-white absolute z-15 right-0 mt-[1rem] text-[2rem] text-left">
                                                            <NavLink href="/profile">
                                                                <button className="text-dark-1 hover:text-yellow-1" onClick={handleProfileDropdown}>👤 Профиль</button>
                                                            </NavLink>
                                                            <button
                                                            onClick={openModal}
                                                            className="text-red-1 hover:text-red-2 mt-[2rem]">🚪 Выйти</button>
                                                        </div>
                                                    )
                                                }
                                                <div className='absolute bottom-0 z-[0] rounded-b-[10px] w-full h-[25px] bg-yellow-2'></div>

                                            </div>
                                            ) : (
                                                <Link href='/login'>
                                                    <Button type="dark">Войти</Button>
                                                </Link>
                                            )
                                        }
                                        <MenuOpenButton onClick={handleMenu}/>
                                    </div>
                                </>
                            )
                        }
                    </nav>
                </Section>
            </header>
            <BaseModal
                modalActive={showModal}
                title="Уже уходите? 😢"
                onClose={closeModal}
                onConfirm={handleSignOut}
                type="confirm"
                buttonText="Да, выйти"
                danger
                description="Если выйдете, придётся снова авторизоваться при следующем заходе. Точно хотите выйти?"
            />
        </>
    );
}
 
export default Header;