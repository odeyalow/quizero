'use client'

import { useRouter } from "next/navigation";

import Section from "./section";
import IconButton from "../ui/iconButton";

import Arrow from "@/assets/arrow";

interface SectionWithButtonProps {
    bigTitle?: string;
    smallTitle?: string;
    styles?: string;
    children: React.ReactNode;
}

const SectionWithHeader:React.FC<SectionWithButtonProps> = ({ bigTitle, smallTitle, styles, children }) => {
    const router = useRouter();
    
    return (
        <Section styles={styles}>
            <header className="flex gap-[2rem] mb-[5rem] items-center max-sm:justify-center">
                <IconButton
                    type="gray"
                    onClick={router.back}>
                    <Arrow />
                </IconButton>
                {
                    bigTitle && <h1 style={{fontSize: 'clamp(2.5rem, 8vw, 4rem)'}}
                    className="font-extrabold text-left">{bigTitle}</h1>
                }
                {
                    smallTitle && <h1 style={{fontSize: 'clamp(1.5rem, 5vw, 2.8rem)'}}
                    className="font-extrabold text-left">{smallTitle}</h1>
                }
            </header>
            {children}
        </Section>
    )
}
 
export default SectionWithHeader;