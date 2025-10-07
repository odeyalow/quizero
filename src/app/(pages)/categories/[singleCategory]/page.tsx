'use client';

import { useSearchParams } from "next/navigation";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import QuizzesGrid from "@/components/layouts/quizzesGrid";

import useGetData from "@/hooks/useGetData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";

export default function SingleCategory() {
    const params = useSearchParams();
    const categoryName = params.get('title');
    const categoryId = params.get('id');
    const { data } = useGetData<QuizDataType>(categoryId!, () => quizzesService.getWithFilters({ category: categoryId! }));

    return (
        <>
            <SectionWithHeader smallTitle={`Все квизы в категории "${categoryName}"`}>
                {
                    data?.length ?  <QuizzesGrid quizzes={data}/> : (
                        <h2 className="text-gray text-[2.5rem] text-center pt-[10rem]">Упс... В этой категории пока нету квизов(</h2>
                    )
                }
            </SectionWithHeader>
        </>
    )
}