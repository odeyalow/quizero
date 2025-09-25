'use client';

import { useState, useEffect, useRef } from "react";

import Button from "./button";

import useGetData from "@/hooks/useGetData";
import CategoryDataType from "@/types/CategoryDataType";
import categoriesService from "@/services/categoriesService";

import { useAppSelector } from "@/hooks/useStore";

const CategoriesSelect = ({ onSelect }: { onSelect: (categoryId: string) => void }) => {
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const { data } = useGetData<CategoryDataType>('categories', categoriesService.getAll);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }

    const onCategorySelect = (data: CategoryDataType) => {
        setShowOptions(false);
        onSelect(data.id);
    }

    const getSelectedCategory = () => {
        return data?.find(category => category.id === newQuiz.category);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (!selectRef.current?.contains(event.target as Node)) setShowOptions(false);
        })
    }, [])

    return (
        <div className="relative w-full" ref={selectRef}>
            <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Категории</span>
            <Button
                type="gray"
                styles='flex items-center justify-between h-[43.2px]'
                onClick={(e) => {
                    e.preventDefault();
                    handleShowOptions();
                }}
                active={showOptions}
                >
                <p className="truncate text-dark-1">
                    {getSelectedCategory()?.emoji} {getSelectedCategory()?.title}
                </p>
                <div className="relative flex items-center justify-center bg-white w-[20px] h-full mr-[-5px] ml-[10px]">
                    { !showOptions && <div className="bg-gray w-[4px] h-[20px] rounded absolute"></div>}
                    <div className="bg-gray w-[4px] h-[20px] rounded rotate-90 absolute"></div>
                </div>
            </Button>
            <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
            {
                showOptions && (
                    <div className="bg-white border-[3.5px] border-gray rounded-[1rem] text-[1.6rem] max-h-[300px] overflow-y-scroll flex flex-col items-start absolute z-99 w-full mt-[1rem]">
                        {
                            data && data.map((data: CategoryDataType) => {
                                return (
                                    <button
                                    key={data.id}
                                    onClick={() => onCategorySelect(data)}
                                    className="w-full text-left p-[1.25rem] hover:bg-gray">
                                        {data.emoji} {data.title}
                                    </button>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}
 
export default CategoriesSelect;