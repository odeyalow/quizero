'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import MainInfoForm from "@/components/forms/mainInfoForm";
import QuestionsForm from "@/components/forms/questionsForm";
import QuizPreview from "@/components/layouts/quizPreview";
import Button from "@/components/ui/button";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";

export default function CreateQuiz() {
    const router = useRouter();

    const [step, setStep] = useState<number>(1);
    const [showQuestions, setShowQuestions] = useState<boolean>(false);

    const onNextStep = () => {
        if ( step !== 3 ) setStep(prev => prev + 1);
        // TODO: Replace id in replace to quiz id that have been added!
        else if ( step === 3 ) router.replace(`/quizzes/ID`);
    }
    const onPrevStep = () => {
        setStep(prev => prev - 1);
        setShowQuestions(false);
    }

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
                        step === 3 && !showQuestions && (
                            <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                className="text-[2rem]">
                                Так будет выглядеть страница вашего квиза после публикации!
                            </p>
                        )
                    }
                    {
                        step === 3 && showQuestions && (
                            <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                className="text-[2rem]">
                                Так будет выглядеть страница вопросов вашего квиза при процессе прохождения!
                            </p>
                        )
                    }
                </div>
                { step === 1 && <MainInfoForm onNextStep={onNextStep}/>}
                { step === 2 && <QuestionsForm onPrevStep={onPrevStep} onNextStep={onNextStep}/>}
                { step === 3 && <QuizPreview showQuestions={showQuestions} onPrevStep={onPrevStep}/>}
            </div>
        </SectionWithHeader>
    )
}