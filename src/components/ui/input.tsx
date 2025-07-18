'use client';

import { FieldErrors, UseFormRegister } from "react-hook-form";

import EyeClosed from "@/assets/eyeClosed";
import EyeOpen from "@/assets/eyeOpen";
import { useState } from "react";

interface InputProps {
    type: string;
    label?: string;
    name: string;
    placeholder: string;
    styles?: string;
    register?: UseFormRegister<any>;
    errors?: FieldErrors;
}

const Input:React.FC<InputProps> = ({ type, name, label, placeholder, styles, register, errors }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;
    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="relative w-full">
            {
                label && (
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">{label}</span>
                )
            }
            <div className={`
                    w-full h-[45px] px-[15px] relative z-2
                    border-[3.5px] border-gray rounded-[10px]
                    bg-white
                    text-[1.6rem] font-semibold placeholder:text-gray leading-[5px]
                    flex justify-between
                    ${inputFocus ? 'translate-y-0' : 'translate-y-[-3px]'} ${styles}
                `}>
                <input
                type={inputType}
                placeholder={placeholder}
                name={name}
                autoComplete="off"
                className="w-full pr-[15px] focus:outline-0"
                {...(register && register(name))}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                />
                {type === 'password' && (
                    <button onClick={handleShowPassword} className="w-[25px]">
                        {showPassword ? <EyeOpen /> : <EyeClosed />}
                    </button>
                )}
                </div>
                <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
            </div>
            { errors && <strong className="text-red-1 text-[1.6rem] mt-[-1rem]">{errors?.[name]?.message as string}</strong> }
        </>
    );
}
 
export default Input;