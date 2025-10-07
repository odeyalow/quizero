'use client';

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { QuizDataType } from "@/types/QuizDataType";
import quizzesService from "@/services/quizzesService";
import Button from "@/components/ui/button";

export default function Quizzes() {
    const { data: quizzes, fetchMore, hasMore, isFetching } = useInfiniteScroll<QuizDataType>(
        (lastVisible) => quizzesService.getWithPagination(9, lastVisible)
    );

    return (
        <SectionWithHeader bigTitle="Все квизы">
            <QuizzesGrid quizzes={quizzes}/>
            {hasMore && !isFetching && (
                <div className="flex justify-center mt-[5rem]">
                    <Button
                    type="blue"
                    onClick={fetchMore}
                    styles="">Загрузить ещё</Button>
                </div>
            )}
        </SectionWithHeader>
    )
}