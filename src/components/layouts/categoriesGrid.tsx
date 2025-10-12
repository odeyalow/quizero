'use client';

import Link from "next/link";

import CategoryCard from "@/components/ui/categoryCard"
import Spinner from "../ui/spinner";

import useGetData from "@/hooks/useGetData";
import categoriesService from "@/services/categoriesService";
import CategoryDataType from "@/types/CategoryDataType";

const CategoriesGrid = () => {
    const { data, isPending } = useGetData<CategoryDataType>('categories', categoriesService.getAll);
    
    if ( isPending ) { return <Spinner />}
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
                <Link
                href='/quizzes'
                className="relative">
                    <div
                    className={`
                        flex justify-center items-center gap-[1.5rem]
                        translate-y-[-5px] cursor-pointer relative z-2
                        w-full py-[4rem] max-md:py-[2rem]
                        border-[5px] rounded-[20px] border-gray
                        text-[3rem] font-extrabold leading-[21px] text-gray
                        active:translate-y-0 hover:translate-y-[-10px]
                        bg-white
                    `}>
                    <h2>Все квизы</h2>
                </div>
                <div className={`absolute bottom-0 z-[0] rounded-b-[20px] w-full h-[30px] bg-gray`}></div>
            </Link>
            {
                data && data.map((category: CategoryDataType) => {
                    return <CategoryCard
                            key={category.id}
                            emoji={category.emoji}
                            title={category.title}
                            id={category.id}
                            />
                })
            }
        </div>
    );
    
}
 
export default CategoriesGrid;