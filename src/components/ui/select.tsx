'use client';

import { useState, useEffect, ReactEventHandler, useRef } from "react";

import Button from "./button";
import CheckButton from "@/components/ui/сheckButton";

interface SelectProps {
    label?: string;
    options: string[];
}

const Select:React.FC<SelectProps> = ({ label, options }) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (!selectRef.current?.contains(event.target as Node)) setShowOptions(false);
        })
    }, [])

    return (
        <div className="relative w-full" ref={selectRef}>
            {
                label && (
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">{label}</span>
                )
            }
            <Button
                type="gray"
                styles='flex items-center justify-between h-[43.2px]'
                onClick={handleShowOptions}
                active={showOptions}
                >
                <p className="truncate text-dark-1">
                    Все
                </p>
                <div className="relative flex items-center justify-center bg-white w-[20px] h-full mr-[-5px] ml-[10px]">
                    { !showOptions && <div className="bg-gray w-[4px] h-[20px] rounded absolute"></div>}
                    <div className="bg-gray w-[4px] h-[20px] rounded rotate-90 absolute"></div>
                </div>
            </Button>
            <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
            {
                showOptions && (
                    <div className="flex flex-col gap-[1.5rem] bg-white border-[3.5px] border-gray w-full p-[1.5rem] rounded-[1rem] absolute mt-[1rem] z-10">
                        {
                            options.map(option => {
                                return <CheckButton
                                        type="checkbox"
                                        name="category-checkbox"
                                        value={option}
                                        key={option}
                                        />
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}
 
export default Select;