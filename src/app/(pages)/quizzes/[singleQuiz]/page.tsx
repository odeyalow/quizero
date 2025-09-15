'use client';

import Image from "next/image";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "../../../../components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";
import Verified from "@/assets/verified";

import useGetSingleData from "@/hooks/useGetSingleData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";
import categoriesService from "@/services/categoriesService";
import CategoryDataType from "@/types/CategoryDataType";
import { useAuthData } from "@/components/layouts/authProvider";

export default function SingleQuiz() {
    const params = useSearchParams();
    const router = useRouter();
    const user = useAuthData();
    const quizId = params.get('id');
    const { data: quizData } = useGetSingleData<QuizDataType | null>(`quiz-${quizId}`, () => quizzesService.getById(quizId!));
    const { data: categoryData } = useGetSingleData<CategoryDataType | null>(`category-${quizData?.category}`, () => categoriesService.getById(quizData?.category!));

    const linkHref = {
        pathname: `/quizzes/atempt/${quizId}`,
        query: {
            id: quizId,
            quizSlug: quizData?.slug
        }
    }
    
    useEffect(() => {
        document.body.style.overflowY = 'scroll';
    }, [])

    return (
        <SectionWithHeader bigTitle="Готовы к вызову?">
            <h2 className="text-[3rem] font-extrabold mb-[3rem]">{quizData && quizData?.title}</h2>
            <div className="flex gap-[3rem] max-[1100px]:flex-col">
                <div className="max-w-[670px] max-[1100px]:max-w-full max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                    {
                        quizData?.coverImage && (
                            <Image
                            src={quizData?.coverImage}
                            width={670}
                            height={380}
                            alt="Quiz Cover"
                            className="max-w-[100%] h-[380px] object-cover rounded-[1rem] border-light-2 border-[5px] mb-[3rem] max-sm:h-[300px]"
                            />
                        )
                    }
                    <div>
                        <h3 className="text-[2.4rem] font-extrabold mb-[1.5rem]">Описание</h3>
                        <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                            className="text-[2rem] font-normal">
                            {quizData?.description}
                        </p>
                    </div>
                </div>
                <div className="bg-white border-[5px] border-gray p-[3rem] rounded-[1rem] w-full h-min max-[1100px]:max-w-[600px] max-[1100px]:mx-auto">
                    <div className="flex flex-col gap-[2.5rem] mb-[3rem]">
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">{categoryData?.emoji} {categoryData?.title}</h4>
                        <div className="flex items-center gap-[0.5rem]">
                            <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                            className="text-[2.4rem] font-bold">👤 от {quizData?.author}</h4>
                            {
                                quizData?.isConfirmed && (
                                    <Verified />
                                )
                            }
                        </div>
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">❓ Вопросы: {quizData?.questionsAmount}</h4>
                        <p className="text-gray text-[1.6rem]">
                            {
                                quizData && quizData?.tags.map((tag: string) => {
                                    return <span key={tag} className="capitalize">{tag}. </span>;
                                })
                            }
                        </p>
                    </div>
                    <div className="flex gap-[1rem] max-[300px]:flex-col">
                        <div className="w-full">
                            <Link href={user.user ? linkHref : '/login'}>
                                <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem]">
                                    Начать
                                    <Triangle />
                                </Button>
                            </Link>
                        </div>
                        <IconButton type="blue">
                            <Share />
                        </IconButton>
                    </div>
                </div>
            </div>
        </SectionWithHeader>
    )
}