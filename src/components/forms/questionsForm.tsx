import { useEffect } from "react";
import { transliterate } from 'transliteration';

import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/categoriesSelect";
import CheckButton from "@/components/ui/сheckButton";
import FormInput from "../ui/formInput";
import Button from "../ui/button";
import IconButton from "../ui/iconButton";

import Cross from "@/assets/cross";
import Arrow from "@/assets/arrow";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
    setSlug,
    setQuestionsAmount,
    addQuestion,
    removeQuestion
} from "@/store/slices/newQuizSlice";

interface QuestionFormProps {
    onPrevStep: () => void;
    onNextStep: () => void;
}

const QuestionsForm:React.FC<QuestionFormProps> = ({ onPrevStep, onNextStep }) => {
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const titleSlug = transliterate(newQuiz.title).replace(/ /g, '-');
        dispatch(setSlug(titleSlug));
    })

    return (
        <>
            <div className="flex flex-col gap-[3rem]">
                <div className="flex gap-[1.5rem] flex-wrap max-sm:justify-center">
                    <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                        <Button type="gray" styles="text-[2rem]">1</Button>
                        <Button type="blue" active styles="text-[2rem]">2</Button>
                        <Button type="gray" styles="text-[2rem]">3</Button>
                    </div>
                    <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                        <Button type="blue" styles="text-[2rem]">Добавить</Button>
                        <Button type="red" styles="text-[2rem]">Удалить</Button>
                    </div>
                </div>
                <div className="w-full">
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Картинка</span>
                    <div className="border-[5px] border-gray border-dashed rounded-[1rem] h-[450px] mb-[3rem] relative grid place-items-center group hover:border-blue-1 max-sm:h-[250px]">
                        <span style={{fontSize: 'clamp(1.5rem, 3vw, 2rem)'}}
                            className="absolute text-[2rem] mx-[10rem] text-center text-gray font-bold group-hover:text-blue-1 max-sm:mx-[5rem]">
                            Загрузите картинку которая будет показываться на этом вопросе. *Если картинка не загружена то вопрос будет без нее.
                        </span>
                        <input type="file" name="quiz-cover" className="opacity-0 cursor-pointer w-full h-full" />
                    </div>
                    <Button type="blue">Загрузить изображение</Button>
                </div>
                <FormInput type="text" placeholder="Как он будет называться?" name="quiz-name" label="Текст вопроса"/>
                <div className="flex flex-col gap-[1.5rem]">
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Варианты ответов</span>
                    <div className="flex gap-[1rem]">
                        {/* <CheckButton type="radio" name="quiz-question"/> */}
                        <FormInput type="text" placeholder="Текст ответа" name="quiz-name"/>
                        <IconButton type="gray">
                            <Cross styles="w-[25px]"/>
                        </IconButton>
                    </div>
                    <div className="flex gap-[1rem]">
                        {/* <CheckButton type="radio" name="quiz-question"/> */}
                        <FormInput type="text" placeholder="Текст ответа" name="quiz-name"/>
                        <IconButton type="gray">
                            <Cross styles="w-[25px]"/>
                        </IconButton>
                    </div>
                    <div className="flex gap-[1rem]">
                        {/* <CheckButton type="radio" name="quiz-question"/> */}
                        <FormInput type="text" placeholder="Текст ответа" name="quiz-name"/>
                        <IconButton type="gray">
                            <Cross styles="w-[25px]"/>
                        </IconButton>
                    </div>
                </div>
                <Button type="blue">Добавить ответ</Button>
                <div className="flex justify-between mt-[10rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
                    <Button
                    onClick={onPrevStep}
                    type="gray"
                    styles="flex items-center gap-[0.5rem] h-full justify-center">
                        <Arrow styles="max-w-[20px] h-[20px]"/>
                        Назад
                    </Button>
                    <Button
                    onClick={onNextStep}
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