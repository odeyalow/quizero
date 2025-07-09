import CategoriesGrid from "@/components/layouts/categoriesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";

export default function Discover() {
    return (
        <SectionWithHeader bigTitle="Категории">
            <CategoriesGrid />
        </SectionWithHeader>
    )
}