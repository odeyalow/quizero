'use client';

import { useSearchParams } from "next/navigation";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import QuizzesGrid from "@/components/layouts/quizzesGrid";

export default function Categories() {
    const params = useSearchParams();
    const categoryName = params.get('categoryName')

    return (
        <SectionWithHeader smallTitle={`Все квизы в категории "${categoryName}"`}>
            <QuizzesGrid />
        </SectionWithHeader>
    )
}