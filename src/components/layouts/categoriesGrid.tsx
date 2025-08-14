'use client';

import CategoryCard from "@/components/ui/categoryCard"

import useGetData from "@/hooks/useGetData";
import categoriesService from "@/services/categoriesService";
import CategoryDataType from "@/types/CategoryDataType";

const CategoriesGrid = () => {
    const { data } = useGetData<CategoryDataType>('categories', categoriesService.getAll);
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
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