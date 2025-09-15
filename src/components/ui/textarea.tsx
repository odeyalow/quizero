'use client';

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextareaProps {
    label?: string;
    name: string;
    placeholder: string
    register: UseFormRegister<any>;
    errors?: FieldErrors;
}

const Textarea:React.FC<TextareaProps> = ({ name, label, placeholder, register, errors }) => {
    return (
        <>
            <div className="relative w-full">
            {
                label && (
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">{label}</span>
                )
            }
            <textarea
            {...(register && register(name))}
            placeholder={placeholder}
            name={name}
            autoComplete="off"
            className={`
                translate-y-[-1.5px]
                overflow-y-scroll resize-none
                w-full h-[240px] py-[10px] px-[15px] relative z-2
                border-[3.5px] border-gray rounded-[10px]
                bg-white
                text-[1.6rem] font-semibold placeholder:text-gray leading-[2rem]
                focus:translate-y-[1px] focus:outline-0
            `}/>
            <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
            </div>
            { errors && <strong className="text-red-1 text-[1.6rem] mt-[-1rem]">{errors?.[name]?.message as string}</strong> }
        </>
    );
}
 
export default Textarea;