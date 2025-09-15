'use client';

import { useState } from "react";

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    styles?: string;
    onChange?: (value: string) => void;
    onFocus?: (value: boolean) => void;
}

const Input:React.FC<InputProps> = ({ type, name, placeholder, value, styles, onChange, onFocus }) => {
    const [inputFocus, setInputFocus] = useState<boolean>(false);

    const handleFocus = (booleanValue: boolean) => {
        setInputFocus(booleanValue);
        setTimeout(() => {
            onFocus?.(booleanValue);
        }, 100);
    }

    return (
        <>
            <div className="relative w-full">
                <div className={`
                        w-full h-[45px] px-[15px] relative z-2
                        border-[3.5px] border-gray rounded-[10px]
                        bg-white
                        text-[1.6rem] font-semibold placeholder:text-gray leading-[5px]
                        flex justify-between
                        ${inputFocus ? 'translate-y-0' : 'translate-y-[-3px]'} ${styles}
                    `}>
                    <input
                    onChange={(e) => onChange?.(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    autoComplete="off"
                    className="w-full pr-[15px] focus:outline-0"
                    value={value}
                    onFocus={() => handleFocus(true)}
                    onBlur={() => handleFocus(false)}
                    />
                    </div>
                    <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
                </div>
        </>
    );
}
 
export default Input;