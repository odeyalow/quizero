import Image from "next/image";
import Link from "next/link";

import NavLink from "../ui/navLink";

//icons
import Github from "../../../public/icons/github";
import Instagram from "../../../public/icons/instagram";

const Footer = () => {
    // absolute bottom-0
    return (
        <footer className="bg-dark-2 py-[7rem]">
            <div className="relative flex flex-col content-center max-w-[1200px] mx-auto px-[2.5rem]">
                <div className="flex items-center justify-between mb-[3rem] gap-[2rem] max-sm:flex-col">
                    <Link href="/" className="flex items-center gap-[1rem] shrink-0">
                        <Image
                        src='/images/logo.png'
                        width={60}
                        height={60}
                        alt="Logo"></Image>
                    </Link>
                    <h3 className="text-[3.6rem] font-bold text-left text-yellow-1 max-md:text-[2.6rem] max-sm:text-center">Играй. Учись. Делись. Квизы для ума и настроения.</h3>
                </div>
                <div className="flex items-center justify-between gap-[2rem] max-md:flex-col-reverse">
                    <div className="flex items-center gap-[1rem]">
                        <Link href="https://www.instagram.com/odeyalow/" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                        </Link>
                        <Link href="https://github.com/odeyalow" target="_blank" rel="noopener noreferrer">
                            <Github />
                        </Link>
                    </div>
                    <div className="flex items-center gap-[5rem] max-sm:flex-col max-sm:gap-[2.5rem]">
                        <NavLink textColor="text-light-1" href="discover">Исследовать</NavLink>
                        <NavLink textColor="text-light-1" href="create-quiz"> Создать</NavLink>
                        <NavLink textColor="text-light-1" href="/">Главная</NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;