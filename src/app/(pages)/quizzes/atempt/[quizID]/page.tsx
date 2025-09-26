'use client'

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Section from "@/components/layouts/section";
import Button from "../../../../../components/ui/button";
import BaseModal from "@/components/ui/baseModal";
import NavigationGuard from "@/components/layouts/navigationGuard";

import useGetSingleData from "@/hooks/useGetSingleData";
import quizzesService from "@/services/quizzesService";
import { OptionType, QuizDataType } from "@/types/QuizDataType";
import useModal from "@/hooks/useModal";

import Arrow from "@/assets/arrow";
import Cross from "@/assets/cross";

export default function QuizAtempt() {
    const params = useSearchParams();
    const router = useRouter();
    const quizId = params.get('id');
    const { data } = useGetSingleData<QuizDataType | null>(`quiz-atempt-${quizId}`, () => quizzesService.getById(quizId!));
    const [randomizedOptions, setRandomizedOptions] = useState<OptionType[]>([]);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [questionAnswers, setQuestionAnswers] = useState<OptionType[]>([])
    const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
    const { questions } = data ?? {};
    const currentQuestion = questions?.[currentQuestionNumber];
    const { showModal, openModal, closeModal } = useModal();
    const onAnswer = (text: string, isCorrect: boolean) => {
        setQuestionAnswers(answers => [...answers, { text: text, isCorrect: isCorrect }]);
        setShowCorrectAnswer(true);
    }
    const getButtonType = (option: OptionType) => {
        if ( questionAnswers[currentQuestionNumber]?.text === option.text && questionAnswers[currentQuestionNumber]?.isCorrect ) {
            return 'green';
        }
        if ( questionAnswers[currentQuestionNumber]?.text === option.text && !questionAnswers[currentQuestionNumber]?.isCorrect ) {
            return 'red';
        }
        if ( showCorrectAnswer && option.isCorrect ) return 'green';
        return 'gray';
    }
    const getCorrectAnswersAmount = () => {
        let correctAnswersAmount = 0;
        for (let i = 0; i <= questionAnswers.length; i++) {
            if ( questionAnswers[i]?.isCorrect ) {
                correctAnswersAmount++;
            }
        }
        return correctAnswersAmount;
    }
    const onNextQuestion = () => {
        if ( questions && currentQuestionNumber+1 === questions?.length ) {
            sessionStorage.setItem(`quiz-${quizId}-allQuestionsAmount`, questions.length.toString());
            sessionStorage.setItem(`quiz-${quizId}-correctAnswersAmount`, getCorrectAnswersAmount().toString());
            router.replace(`/quiz-result?id=${quizId}`);
        } else {
            setShowCorrectAnswer(false);
            setCurrentQuestionNumber(number => number + 1);
        }
    }
    const getProgressBarPercentage = () => {
        if (!questions || questions.length === 0) return 0;
        return Math.round(((currentQuestionNumber + 1) / questions.length) * 100);
    }; 
    const onQuizExit = () => {
        router.back();
    }

    useEffect(() => {
        if (currentQuestion?.options) {
            setRandomizedOptions(
                [...currentQuestion.options].sort(() => Math.random() - 0.5)
            );
        }
    }, [currentQuestion]);

    return (
        <NavigationGuard isAllowed={questionAnswers.length === 0}>
            <Section styles="mb-[10rem]">
                <div>
                    <div className="mb-[5rem]">
                        <span style={{fontSize: 'clamp(2rem, 7vw, 2.4rem)'}}
                            className="text-[2.4rem] font-semibold mb-[1.5rem] block">Вопрос {currentQuestionNumber+1} из {questions?.length}</span>
                        <div className="bg-yellow-2 w-full h-[20px] rounded-full p-[0.4rem]">
                            <div className={`bg-yellow-1 h-full rounded-full`}
                            style={{ width: `${getProgressBarPercentage()}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-sm:p-[1.5rem]">
                        {
                            currentQuestion?.image && (
                                <Image
                                src={currentQuestion?.image}
                                width={1000}
                                height={600}
                                alt="Quiz Cover"
                                className="w-full h-[600px] object-cover rounded-[1rem] max-md:h-[300px] mb-[3rem]"
                                />
                            )
                        }
                        <h2 style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)'}}
                            className="text-[3rem] font-extrabold mb-[3rem]">{currentQuestion?.title}</h2>
                        <div className="flex flex-col gap-[2rem]">
                            {
                                randomizedOptions.map((option: OptionType) => {
                                    return <Button
                                            key={option.text}
                                            onClick={() => onAnswer(option.text, option.isCorrect)}
                                            active={option.text === questionAnswers[currentQuestionNumber]?.text}
                                            type={getButtonType(option)}
                                            styles="text-left text-[2rem]">{option.text}</Button>
                                })
                            }
                        </div>
                    </div>
                    <div className="flex justify-between mt-[3rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem] max-[350px]:mt-[10rem]">
                        <Button
                            onClick={openModal}
                            type="red"
                            styles="flex items-center gap-[0.5rem] h-full justify-center">
                            Покинуть квиз
                            <Cross styles="max-w-[25px] h-[25px]"/>
                        </Button>
                        <Button
                            onClick={onNextQuestion}
                            disabled={questionAnswers.length < currentQuestionNumber+1}
                            type="blue"
                            styles="flex items-center gap-[0.5rem] h-full justify-center">
                            {
                                questions && currentQuestionNumber+1 < questions?.length ? 'Дальше' : 'Перейти к результатам'
                            }
                            <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                        </Button>
                    </div>
                </div>
            </Section>
            <BaseModal
                modalActive={showModal}
                title="Вы покидаете квиз"
                onClose={closeModal}
                onConfirm={onQuizExit}
                type="confirm"
                buttonText="Покинуть"
                danger
                description="Вы точно уверены что хотите покинуть квиз? Ваш пройденный прогресс не сохранится!"
            />
        </NavigationGuard>
    )
}