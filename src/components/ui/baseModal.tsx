import IconButton from "./iconButton";
import Button from "./button";

import Cross from "@/assets/cross";

interface BaseModalProps {
    modalActive: boolean
    title: string;
    styles?: string;
    onClose: () => void;
    onConfirm: () => void;
    type: 'confirm' | 'accept';
    buttonText: string;
    description?: string;
    danger?: boolean;
    children?: React.ReactNode;
}

const BaseModal:React.FC<BaseModalProps> = ({
    modalActive,
    title,
    styles,
    onClose,
    onConfirm,
    type,
    buttonText,
    description,
    danger,
    children
    }) => {

    const textColor = danger ? 'text-red-1' : 'text-yellow-1';
    const buttonType = danger ? 'red' : 'yellow';
    
    if ( modalActive ) {
        return (
            <div className="bg-black/40 fixed inset-0 z-999 grid place-items-center px-[2.5rem] w-[100lvw] h-[100lvh] overflow-y-scroll">
                <div className={`bg-light-1 p-[3rem] rounded-[1.5rem] border-[5px] border-light-2 max-w-[600px] ${styles}`}>
                    <header className="flex items-center justify-between gap-[1.5rem] mb-[1.5rem]">
                        <h5 className={`text-[2.5rem] font-extrabold ${textColor}`}>{title}</h5>
                        {
                            type !== 'accept' && (
                                <IconButton onClick={onClose} type="gray">
                                    <Cross styles="w-[30px]"/>
                                </IconButton>
                            )
                        }
                    </header>
                    { 
                        description && (
                            <p className="text-[1.8rem] text-left mb-[3rem]">
                                {description}
                            </p>
                        )
                    }
                    {children}
                    {
                        type === 'confirm' ? (
                            <div className="flex gap-[1.5rem]">
                                <div className="w-full">
                                    <Button styles="text-[2rem]" type="gray" onClick={onClose}>Отмена</Button>
                                </div>
                                <div className="w-full">
                                    <Button styles="text-[2rem]" type={buttonType} onClick={onConfirm}>{buttonText}</Button>
                                </div>
                            </div>
                        ) : (
                            <Button type='yellow' onClick={onConfirm}>{buttonText}</Button>
                        )
                    }
                </div>
            </div>
        );
    }
}
 
export default BaseModal;