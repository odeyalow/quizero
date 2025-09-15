'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import MainInfoForm from "@/components/forms/mainInfoForm";
import QuestionsForm from "@/components/forms/questionsForm";
import QuizPreview from "@/components/layouts/quizPreview";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";

import Arrow from "@/assets/arrow";

export default function CreateQuiz() {
    const router = useRouter();

    const [step, setStep] = useState<number>(1);

    const onNextStep = () => {
        if ( step !== 3 ) setStep(prev => prev + 1);
        // TODO: Replace id in replace to quiz id that have been added!
        else if ( step === 3 ) router.replace(`/quizzes/ID`);
    }
    const onPrevStep = () => {
        setStep(prev => prev - 1);
    }

    return (
        <SectionWithHeader bigTitle="Создание квиза">
            <div>
                <div className="mb-[3rem] max-sm:text-center">
                    <h2 style={{fontSize: 'clamp(2rem, 7vw, 3rem)'}}
                        className="text-[3rem] font-extrabold mb-[1rem] text-yellow-1">
                            { step === 1 && 'Общая информация' }
                            { step === 2 && 'Вопросы' }
                            { step === 3 && 'Предпросмотр' }
                    </h2>
                    {
                        step === 3 && (
                            <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                className="text-[2rem]">
                                Так будет выглядеть страница вашего квиза после публикации!
                            </p>
                        )
                    }
                </div>
                { step === 1 && <MainInfoForm onNextStep={onNextStep}/>}
                { step === 2 && <QuestionsForm onPrevStep={onPrevStep} onNextStep={onNextStep}/>}
                { step === 3 && <QuizPreview />}

                {/* <div className="flex justify-between mt-[10rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
                    {
                        step !== 1 ? (
                            <Button
                            onClick={onPrevStep}
                            type="yellow"
                            styles="flex items-center gap-[0.5rem] h-full justify-center">
                                <Arrow styles="max-w-[20px] h-[20px]"/>
                                Назад
                            </Button>
                        ) : <div></div>
                    }
                    <Button
                    onClick={() => onNextStep()}
                    type="yellow"
                    styles="flex items-center gap-[0.5rem] h-full justify-center">
                        {step === 3 ? (
                            <>
                                Опубликовать
                                
                            </>
                        ) : (
                            <>
                                Продолжить
                                <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                            </>
                        )}
                        
                    </Button>
                </div> */}
            </div>
        </SectionWithHeader>
    )
}