import CategoryCard from "@/components/ui/categoryCard"

const CategoriesGrid = () => {
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
            <CategoryCard
            imageUrl="/images/temporary.png"
            imageAlt="Temp"
            title="Категория"
            slug="/categories/singleCategory"
            />
            <CategoryCard
            imageUrl="/images/temporary.png"
            imageAlt="Temp"
            title="Категория"
            slug="/categories/singleCategory"
            />
            <CategoryCard
            imageUrl="/images/temporary.png"
            imageAlt="Temp"
            title="Категория"
            slug="/categories/singleCategory"
            />
            <CategoryCard
            imageUrl="/images/temporary.png"
            imageAlt="Temp"
            title="Категория"
            slug="/categories/singleCategory"
            />
        </div>
    );
}
 
export default CategoriesGrid;