'use client';

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import useGetData from "@/hooks/useGetData";
import { QuizDataType } from "@/types/QuizDataType";
import quizzesService from "@/services/quizzesService";

export default function Quizzes() {
    const { data } = useGetData<QuizDataType>('quizzes', quizzesService.getAll);
    
    return (
        <SectionWithHeader bigTitle="Все квизы">
           {
            data &&  <QuizzesGrid quizzes={data}/>
           }
        </SectionWithHeader>
    )
}