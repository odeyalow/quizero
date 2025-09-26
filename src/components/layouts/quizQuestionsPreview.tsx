import Image from "next/image";

import Button from "../ui/button";
import { useState } from "react";
import { OptionType } from "@/types/QuizDataType";

import Arrow from "@/assets/arrow";

import { useAppSelector } from "@/hooks/useStore";

const QuizQuestionsPreview = () => {
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const currentQuestion = newQuiz.questions[currentQuestionNumber];

    const getProgressBarPercentage = () => {
        if (!newQuiz.questions || newQuiz.questions.length === 0) return 0;
        return Math.round(((currentQuestionNumber + 1) / newQuiz.questions.length) * 100);
    };
    const onQuestionChange = (index: number) => {
        setCurrentQuestionNumber(index);
    }
    
    return (
        <div>
            <div className="flex gap-[1rem] flex-wrap max-sm:justify-center mb-[2rem]">
                {
                    newQuiz.questions.map((_, index) => {
                        return <Button
                                key={index}
                                type={index === currentQuestionNumber ? 'blue' : 'gray'}
                                styles="text-[2rem]"
                                active={index === currentQuestionNumber}
                                onClick={() => onQuestionChange(index)}>
                                    {index + 1}
                                </Button>
                    })
                }
            </div>
            <div>
                <div className="mb-[5rem]">
                    <span style={{fontSize: 'clamp(2rem, 7vw, 2.4rem)'}}
                        className="text-[2.4rem] font-semibold mb-[1.5rem] block">Вопрос {currentQuestionNumber+1} из {newQuiz.questions.length}</span>
                    <div className="bg-yellow-2 w-full h-[20px] rounded-full p-[0.4rem]">
                        <div className={`bg-yellow-1 h-full rounded-full`}
                        style={{ width: `${getProgressBarPercentage()}%` }}></div>
                    </div>
                </div>
                <div className="bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-sm:p-[1.5rem]">
                    {
                        currentQuestion.imageUrl && (
                            <Image
                            src={currentQuestion.imageUrl}
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
                            currentQuestion.options.map((option: OptionType) => {
                                return <Button
                                        key={option.text}
                                        type={option.isCorrect ? 'green' : 'gray'}
                                        styles="text-left text-[2rem]">{option.text}</Button>
                            })
                        }
                    </div>
                </div>
                <span className='text-[2rem] text-gray inline-block mt-[2rem]'>
                    При прохождении любого квиза, варианты ответов каждый раз будут в случайном порядке! Сейчас вы видите начальный порядок ответов.
                </span>
            </div>
        </div>
    );
}
 
export default QuizQuestionsPreview;