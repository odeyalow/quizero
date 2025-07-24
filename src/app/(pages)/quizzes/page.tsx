'use client';

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import useGetData from "@/hooks/useGetData";
import { QuizDataType } from "@/types/QuizDataType";

export default function Quizzes() {
    const { data } = useGetData<QuizDataType>('quizzes');
    
    return (
        <SectionWithHeader bigTitle="Все квизы">
            <QuizzesGrid quizzes={data}/>
        </SectionWithHeader>
    )
}