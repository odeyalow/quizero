'use client';

import Image from "next/image";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "../../../../components/ui/button";
import IconButton from "@/components/ui/iconButton";
import BaseModal from "@/components/ui/baseModal";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";
import Trash from "@/assets/trash";

import useGetSingleData from "@/hooks/useGetSingleData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";
import categoriesService from "@/services/categoriesService";
import CategoryDataType from "@/types/CategoryDataType";
import { useAuthData } from "@/components/layouts/authProvider";
import useDeleteQuiz from "@/hooks/useDeleteQuiz";
import userService from "@/services/userService";
import useModal from "@/hooks/useModal";
import useGetUser from "@/hooks/useGetUser";

export default function SingleQuiz() {
    const router = useRouter();
    const params = useSearchParams();
    const deleteModal = useModal();
    const user = useAuthData();
    const { data: userData } = useGetUser(user.user?.uid);
    const quizId = params.get('id');
    const { data: quizData } = useGetSingleData<QuizDataType | null>(`quiz-${quizId}`, () => quizzesService.getById(quizId!));
    const { data: categoryData } = useGetSingleData<CategoryDataType | null>(`category-${quizData?.category}`, () => categoriesService.getById(quizData?.category!));
    const { mutate, isPending, isError, isSuccess } = useDeleteQuiz(`${quizData?.ownerId}-own-quizzes`, () => quizzesService.deleteQuiz(quizId!));
    
    const attemptHref = {
        pathname: `/quizzes/atempt/${quizId}`,
        query: {
            id: quizId,
            quizSlug: quizData?.slug
        }
    }

    const userHref = {
        pathname: '/user',
        query: {
            id: quizData?.ownerId
        }
    }
    
    useEffect(() => {
        document.body.style.overflowY = 'scroll';
    }, [])

    useEffect(() => {
        if (isSuccess) {
            userService.updateOnQuizDelete(user.user?.uid!, quizId!);
            router.back();
        };
    }, [isSuccess, router]);

    const shareQuiz = async () => {
        const shareUrl = `${window.location.origin}/quizzes/${quizData?.slug}?id=${quizId}`;

        if (navigator.share) {
            await navigator.share({
            title: quizData?.title,
            text: 'Попробуй пройти этот квиз!',
            url: shareUrl,
            });
        } else {
            await navigator.clipboard.writeText(shareUrl);
            alert('Ссылка скопирована!');
        }
    };

    return (
        <>
            <SectionWithHeader bigTitle="Готовы к вызову?">
            <h2 className="text-[3rem] font-extrabold mb-[3rem]">
                {quizData && quizData?.title}
                {
                    userData?.passedQuizzes.find((id: string) => id === quizId) && (
                        <span className="text-light-2"> Пройдено</span>
                    ) 
                }
            </h2>
            <div className="flex gap-[3rem] max-[1100px]:flex-col">
                <div className="max-w-[670px] max-[1100px]:max-w-full max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                    {
                        quizData?.coverImageUrl ? (
                            <Image
                            src={quizData?.coverImageUrl}
                            width={670}
                            height={380}
                            alt="Quiz Cover"
                            className="min-[1100px]:min-w-[670px] max-w-[670px] w-[100%] h-[380px] object-cover rounded-[1rem] border-light-2 border-[5px] mb-[3rem] max-sm:h-[300px]"
                            />
                        ) : (
                            <div className="
                                text-center
                                w-[670px] h-[380px] max-md:h-[200px] 
                                rounded-[1rem] bg-white p-[1rem]
                                border-dark-1 border-[5px] border-dashed
                                flex flex-col justify-center items-center gap-[1rem] mb-[3rem]">
                                <span className="text-[3rem] text-dark-1 font-bold">Упс...</span>
                                <span className="text-[2rem] text-dark-1 font-meduim">👀Картинки нет!</span>
                            </div>
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
                                className="text-[2.4rem] font-bold">
                                👤 от <Link href={user.user?.uid === quizData?.ownerId ? '/profile' : userHref} className="text-blue-1">
                                            {quizData?.author}
                                        </Link>
                                </h4>
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
                            <Link href={user.user ? attemptHref : '/login'}>
                                <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem]">
                                    Начать
                                    <Triangle />
                                </Button>
                            </Link>
                        </div>
                        <IconButton type="blue" onClick={shareQuiz}>
                            <Share />
                        </IconButton>
                        {
                            (userData?.role === 'admin' || user.user?.uid === quizData?.ownerId) && (
                                <IconButton
                                type="red"
                                onClick={deleteModal.openModal}>
                                    <Trash />
                                </IconButton>
                            )
                        }
                    </div>
                </div>
            </div>
            </SectionWithHeader>
            <BaseModal
                modalActive={deleteModal.showModal}
                title="Удалить квиз?"
                onClose={deleteModal.closeModal}
                onConfirm={mutate}
                type="confirm"
                buttonText="Да, удалить"
                danger
                description="Вы уверены, что хотите удалить этот квиз? Это действие нельзя отменить."
            />
        </>
    )
}