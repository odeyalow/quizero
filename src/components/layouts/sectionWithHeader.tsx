import Section from "./section";
import IconButton from "../ui/iconButton";

import Arrow from "@/assets/arrow";

interface SectionWithButtonProps {
    bigTitle?: string;
    smallTitle?: string;
    children: React.ReactNode;
}

const SectionWithHeader:React.FC<SectionWithButtonProps> = ({ bigTitle, smallTitle, children }) => {
    return (
        <Section>
            <header className="flex gap-[2rem] mb-[5rem] items-center max-sm:justify-center">
                <IconButton type="gray">
                    <Arrow />
                </IconButton>
                <h1 style={{fontSize: 'clamp(2.5rem, 8vw, 4rem)'}}
                    className="font-extrabold text-left">{smallTitle || bigTitle}</h1>
            </header>
            {children}
        </Section>
    )
}
 
export default SectionWithHeader;