'use client';

import { useRef, useEffect, useState } from "react";

interface TextareaProps {
    label?: string;
    name: string;
    placeholder: string
}

const Textarea:React.FC<TextareaProps> = ({ name, label, placeholder }) => {
    return (
        <div className="relative w-full">
            {
                label && (
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">{label}</span>
                )
            }
            <textarea
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
    );
}
 
export default Textarea;