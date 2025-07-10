import IconButton from "./iconButton";

import Cross from "@/assets/cross";

interface BaseModalProps {
    title: string;
    styles?: string;
    children: React.ReactNode;
}

const BaseModal:React.FC<BaseModalProps> = ({ title, styles, children }) => {
    return (
        <div className="bg-black/40 fixed inset-0 z-999 grid place-items-center px-[2.5rem] w-full">
            <div className={`bg-light-1 p-[3rem] rounded-[1.5rem] border-[5px] border-light-2 w-full ${styles}`}>
                <header className="flex items-center justify-between gap-[1.5rem] mb-[1.5rem]">
                    <h5 className="text-[2.5rem] text-yellow-1 font-extrabold">{title}</h5>
                    <IconButton type="gray">
                        <Cross styles="w-[30px]"/>
                    </IconButton>
                </header>
                {children}
            </div>
        </div>
    );
}
 
export default BaseModal;