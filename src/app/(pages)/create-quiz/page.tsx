'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MainInfoForm from "@/components/forms/mainInfoForm";
import QuestionsForm from "@/components/forms/questionsForm";
import QuizPreview from "@/components/layouts/quizPreview";
import Button from "@/components/ui/button";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import useCreateQuiz from "@/hooks/useAddQuiz";
import { useAppSelector } from "@/hooks/useStore";
import userService from "@/services/userService";
import { useAuthData } from "@/components/layouts/authProvider";

import QuizImageFilesType from "@/types/QuizImageFilesType";

export default function CreateQuiz() {
    const router = useRouter();
    const newQuiz = useAppSelector((state) => state.newQuiz);
    
    const [step, setStep] = useState<number>(1);
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    
    const [quizImageFiles, setQuizImageFiles] = useState<QuizImageFilesType>({
        coverImage: null,
        questionImages: {
        }
    });

    const { data, mutate, isPending, isError, isSuccess } = useCreateQuiz(newQuiz, quizImageFiles);
    const user = useAuthData();

    useEffect(() => {
        if (isSuccess && data) {
            router.replace(`/quizzes/${data.quizData.slug}?id=${data.quizId}`);
            if ( user.user ) userService.updateOnQuizCreate(user.user?.uid, data.quizId);
        }
    }, [isSuccess, data, router]);

    const onQuizPost = () => mutate();

    const onNextStep = () => 
        setStep(prev => prev + 1);
    const onPrevStep = () => {
        setStep(prev => prev - 1);
        setShowQuestions(false);
    }

    const onCoverImageAdd = (file: File) =>
        setQuizImageFiles(prev => ({...prev, coverImage: file}));
    const onCoverImageRemove = () =>
        setQuizImageFiles(prev => ({...prev, coverImage: null}));
    const onQuestionImageAdd = (questionId: string, file: File) => {
        setQuizImageFiles(prev => ({...prev, questionImages: { ...prev.questionImages, [questionId]: file}}))
    }
    const onQuestionImageRemove = (questionId: string) => {
        setQuizImageFiles(prev => ({...prev, questionImages: { ...prev.questionImages, [questionId]: null}}))
    }
    const onQuestionImageKeyDelete = (questionId: string) => {
        setQuizImageFiles(prev => {
            const newQuestionImages = { ...prev.questionImages };
            delete newQuestionImages[questionId];
            return {
            ...prev,
            questionImages: newQuestionImages,
            };
        });
    };

    return (
        <SectionWithHeader bigTitle="Создание квиза">
            <div>
                <div className="mb-[3rem] max-sm:text-center">
                    <h2 style={{fontSize: 'clamp(2rem, 7vw, 3rem)'}}
                        className="text-[3rem] font-extrabold mb-[1rem] text-yellow-1 inline-block">
                            { step === 1 && 'Общая информация' }
                            { step === 2 && 'Вопросы' }
                            { step === 3 && 'Предпросмотр' }
                    </h2>
                    {
                        step === 3 && (
                            <div className="flex gap-[1rem] flex-wrap max-sm:justify-center my-[2rem]">
                                <Button
                                type={!showQuestions ? 'blue' : 'gray'}
                                active={!showQuestions}
                                styles="text-[2rem]"
                                onClick={() => setShowQuestions(false)}>Главная информация</Button>
                                <Button
                                type={showQuestions ? 'blue' : 'gray'}
                                active={showQuestions}
                                styles="text-[2rem]"
                                onClick={() => setShowQuestions(true)}>Вопросы</Button>
                            </div>
                        )
                    }
                    {
                        step === 3 &&
                        <>
                            {
                                showQuestions ? (
                                    <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                        className="text-[2rem]">
                                        Так будет выглядеть страница вопросов вашего квиза в процессе прохождения!
                                    </p>
                                ) : (
                                    <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                    className="text-[2rem]">
                                        Так будет выглядеть страница вашего квиза после публикации!
                                    </p>
                                )
                            }
                        </>
                    }
                </div>
                { step === 1 &&
                <MainInfoForm
                onCoverImageAdd={onCoverImageAdd}
                onCoverImageRemove={onCoverImageRemove}
                onNextStep={onNextStep}/>}
                { step === 2 &&
                <QuestionsForm
                onQuestionImageAdd={onQuestionImageAdd}
                onQuestionImageRemove={onQuestionImageRemove}
                onQuestionImageKeyDelete={onQuestionImageKeyDelete}
                onPrevStep={onPrevStep}
                onNextStep={onNextStep}/>}
                { step === 3 &&
                <QuizPreview
                onQuizPost={onQuizPost}
                showQuestions={showQuestions}
                onPrevStep={onPrevStep}/>}
            </div>
        </SectionWithHeader>
    )
}