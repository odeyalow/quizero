'use client';

import { useSearchParams } from "next/navigation";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import QuizzesGrid from "@/components/layouts/quizzesGrid";
import Spinner from "@/components/ui/spinner";

import useGetData from "@/hooks/useGetData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";

export default function SingleCategory() {
    const params = useSearchParams();
    const categoryName = params.get('title');
    const categoryId = params.get('id');
    const { data, isPending } = useGetData<QuizDataType>(categoryId!, () => quizzesService.getWithFilters({ category: categoryId! }));

    if ( isPending ) { return <Spinner /> }
    return (
        <>
            <SectionWithHeader smallTitle={`Все квизы в категории "${categoryName}"`}>
                {
                    data?.length ?  <QuizzesGrid quizzes={data} isPending={isPending}/> : (
                        <h2 className="text-gray text-[2.5rem] text-center pt-[10rem]">Упс... В этой категории пока нету квизов(</h2>
                    )
                }
            </SectionWithHeader>
        </>
    )
}