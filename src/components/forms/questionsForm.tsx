import { useState, useEffect, useRef } from "react";
import { transliterate } from 'transliteration';
import Image from "next/image";

import Input from "../ui/input";
import Button from "../ui/button";
import IconButton from "../ui/iconButton";
import CheckButton from "@/components/ui/сheckButton";

import Arrow from "@/assets/arrow";
import Cross from "@/assets/cross"
;
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
    setSlug,
    setQuestionsAmount,
    addQuestion,
    setQuestionTitle,
    setQuestionImage,
    addOption,
    removeOption,
    setOptionText,
    setOptionCorrect,
    removeQuestion
} from "@/store/slices/newQuizSlice";
import { OptionType, QuestionType } from "@/types/QuizDataType";

interface QuestionFormProps {
    onPrevStep: () => void;
    onNextStep: () => void;
}

const QuestionsForm:React.FC<QuestionFormProps> = ({ onPrevStep, onNextStep }) => {
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>();
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
    const [currentOptionInputFocus, setCurrentOptionInputFocus] = useState<number>(0);
    const [questionTitleError, setQuestionTitleError] = useState<boolean>(false);
    const [optionsError, setOptionsError] = useState<boolean>(false);
    const [optionTextError, setOptionTextError] = useState<boolean>(false);

    useEffect(() => {
        const titleSlug = transliterate(newQuiz.title).replace(/ /g, '-');
        dispatch(setSlug(titleSlug));
    }, []);

    useEffect(() => {
        setQuestionTitleError(
            newQuiz.questions.some(
                (question: QuestionType) => question.title === ''
            )
        );
    }, [newQuiz.questions[currentQuestionNumber-1].title]);

    useEffect(() => {
        setOptionsError(
            newQuiz.questions.some(
                (question: QuestionType) => question.options.length < 2
            )
        )
    }, [newQuiz.questions[currentQuestionNumber-1].options]);

    useEffect(() => {
        setOptionTextError(
            newQuiz.questions[currentQuestionNumber-1].options.some(
                (option: OptionType) => option.text === ''
            )
        )
    }, [newQuiz.questions[currentQuestionNumber-1].options]);

    useEffect(() => {
        if ( coverImage ) {
            const coverImageUrl = URL.createObjectURL(coverImage);
            dispatch(setQuestionImage({ questionId: currentQuestionNumber-1, imageUrl: coverImageUrl}));
        }
    }, [coverImage])

    const onNewQuestionAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addQuestion());
        setCurrentQuestionNumber(newQuiz.questions.length + 1);
    }
    const onQuestionRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if ( currentQuestionNumber !== 1 ) setCurrentQuestionNumber(prev => prev - 1);
        else setCurrentQuestionNumber(1);
        
        dispatch(removeQuestion(currentQuestionNumber));
    }
    const onQuestionChange = (index: number) => {
        setCurrentQuestionNumber(index+1);
    }
    const onNewOptionAdd = () => {
        if ( newQuiz.questions[currentQuestionNumber-1].options.length < 5 ) dispatch(addOption(currentQuestionNumber-1));
    }
    const onOptionRempove = (id: number) => {
        dispatch(removeOption({ questionId: currentQuestionNumber-1, optionId: id}));
    }
    const onQuestionTitleChange = (title: string) => {
        dispatch(setQuestionTitle({ questionId: currentQuestionNumber-1, title}))
    }
    const onOptionTextChange = (text: string) => {
        dispatch(setOptionText({ questionId: currentQuestionNumber-1, optionId: currentOptionInputFocus, text}))
    }
    const onOptionMakeCorrect = (optionId: number) => {
        dispatch(setOptionCorrect({ questionId: currentQuestionNumber-1, optionId}))
    }
    const handleNextStep = () => {
        if ( !questionTitleError && !optionsError && !optionTextError ) {
            dispatch(setQuestionsAmount(newQuiz.questions.length));
            onNextStep();
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
    const handleFileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if ( newQuiz.questions[currentQuestionNumber-1].imageUrl ) {
            setCoverImage(null);
            dispatch(setQuestionImage({ questionId: currentQuestionNumber-1, imageUrl: ''}));
        };
        fileInputRef.current?.click();
    }

    return (
        <>
            <div className="flex flex-col gap-[3rem]">
                <div className="flex gap-[1.5rem] flex-wrap max-sm:justify-center">
                    <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                        {
                            newQuiz.questions.map((_, index) => {
                                return <Button
                                        key={index}
                                        type={index + 1 === currentQuestionNumber ? 'blue' : 'gray'}
                                        styles="text-[2rem]"
                                        active={index + 1 === currentQuestionNumber}
                                        onClick={() => onQuestionChange(index)}>
                                            {index + 1}
                                        </Button>
                            })
                        }
                    </div>
                    <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                        <Button
                        type="blue"
                        styles="text-[2rem]"
                        onClick={onNewQuestionAdd}>Добавить</Button>
                        <Button
                        type="red"
                        styles="text-[2rem]"
                        disabled={newQuiz.questions.length === 1}
                        onClick={onQuestionRemove}>
                        Удалить
                        </Button>
                    </div>
                </div>
                {
                    questionTitleError && (
                        <span className='text-[2rem] text-red-1'>
                            Внимание! Некоторые вопросы остались без заголовока, пожалуйста заполните их!
                        </span>
                    )
                }
                {
                    optionsError && (
                        <span className='text-[2rem] text-red-1'>
                            Внимание! У некоторых вопросов недостаточно вариантов ответа, пожалуйста добавьте их!
                        </span>
                    )
                }
                {
                    optionTextError && (
                        <span className='text-[2rem] text-red-1'>
                            Внимание! Варианты ответов у некоторых вопросов остались без содержимого, пожалуйста заполните их!
                        </span>
                    )
                }
                <div className="w-full">
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Картинка</span>
                    <div className={`border-[5px]  rounded-[1rem] h-[450px] mb-[3rem] relative grid place-items-center group  max-sm:h-[250px]
                    ${newQuiz.questions[currentQuestionNumber-1].imageUrl === ''
                    ? 'border-gray border-dashed hover:border-blue-1'
                    : 'border-light-2'}`}>
                        {
                            newQuiz.questions[currentQuestionNumber-1].imageUrl ? (
                                <Image
                                src={newQuiz.questions[currentQuestionNumber-1].imageUrl ?? ''}
                                fill
                                alt="Quiz Image Preview"
                                className="object-cover rounded-[.5rem]"
                                />
                            ) : (
                                <span style={{fontSize: 'clamp(1.5rem, 3vw, 2rem)'}}
                                    className="absolute text-[2rem] mx-[10rem] text-center text-gray font-bold group-hover:text-blue-1 max-sm:mx-[5rem]">
                                    Загрузите картинку которая будет показываться на этом вопросе.<br />*Если картинка не загружена то вопрос будет без нее.
                                </span>
                            )
                        }
                        {
                            newQuiz.questions[currentQuestionNumber-1].imageUrl ? (
                                <Image
                                src={newQuiz.questions[currentQuestionNumber-1].imageUrl}
                                fill
                                alt="Quiz Image Preview"
                                className="rounded-[0.5rem] object-cover"
                                />
                            ) : (
                                <input
                                type="file"
                                name="quiz-cover"
                                ref={fileInputRef}
                                className="opacity-0 cursor-pointer w-full h-full"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setCoverImage(file);
                                }}/>
                            )
                        }
                    </div>
                    <Button
                    onClick={handleFileButton}
                    type={newQuiz.questions[currentQuestionNumber-1].imageUrl ? 'red' : 'blue'}
                    >
                        {newQuiz.questions[currentQuestionNumber-1].imageUrl ? 'Удалить изображение' : 'Загрузить изображение'}
                    </Button>
                </div>
                <span className="block font-bold text-left text-[1.8rem]">Текст вопроса</span>
                <Input
                    type="text"
                    placeholder="Как он будет называться?"
                    name="title"
                    value={newQuiz.questions[currentQuestionNumber-1].title}
                    onChange={onQuestionTitleChange}
                />
                <div className="flex flex-col gap-[1.5rem]">
                    <span className="block font-bold text-left text-[1.8rem]">Варианты ответов</span>
                    {
                        newQuiz.questions[currentQuestionNumber-1].options.map(({ isCorrect }: OptionType, index) => {
                            return <div className="flex gap-[1rem]" key={index}>
                                        <CheckButton
                                        type="radio"
                                        name="quiz-question" 
                                        checked={isCorrect}
                                        onChange={() => onOptionMakeCorrect(index)}
                                        />
                                        <Input type="text"
                                        placeholder="Текст ответа"
                                        name="quiz-name"
                                        value={newQuiz.questions[currentQuestionNumber-1].options[index].text}
                                        onChange={onOptionTextChange}
                                        onFocus={() => setCurrentOptionInputFocus(index)}
                                        />
                                        <IconButton
                                        onClick={() => onOptionRempove(index)}
                                        type="gray">
                                            <Cross styles="w-[25px]"/>
                                        </IconButton>
                                    </div>
                        })
                    }
                </div>
                {
                    newQuiz.questions[currentQuestionNumber-1].options.length < 5 && (
                        <Button
                        type="blue"
                        onClick={onNewOptionAdd}>Добавить вариант ответ</Button>
                    )
                }
                <span className='text-[2rem] text-gray'>
                    {newQuiz.questions[currentQuestionNumber-1].options.length === 0 && 'Вы не добавили ни одного варианта ответа. '}
                    {newQuiz.questions[currentQuestionNumber-1].options.length < 2 && 'Добавьте не менее 2 вариантов ответа к вопросу!'}
                </span>
                <div className="flex justify-between mt-[5rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
                    <Button
                    onClick={onPrevStep}
                    type="gray"
                    styles="flex items-center gap-[0.5rem] h-full justify-center">
                        <Arrow styles="max-w-[20px] h-[20px]"/>
                        Назад
                    </Button>
                    <Button
                    onClick={handleNextStep}
                    type="yellow"
                    styles="flex items-center gap-[0.5rem] h-full justify-center">
                        Продолжить
                        <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                    </Button>
                </div>
            </div>
        </>
    );
}
 
export default QuestionsForm;