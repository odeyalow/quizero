import Image from "next/image";

import IconButton from "@/components/ui/iconButton";
import Button from "../ui/button";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";
import Arrow from "@/assets/arrow";

import { useAppSelector } from "@/hooks/useStore";
import useGetSingleData from "@/hooks/useGetSingleData";
import CategoryDataType from "@/types/CategoryDataType";
import categoriesService from "@/services/categoriesService";

const QuizMainInfoPreview = () => {
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const { data } = useGetSingleData<CategoryDataType | null>(`category-${newQuiz.category}`, () => categoriesService.getById(newQuiz.category));

    return (
        <div>
            <h2 style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)'}}
            className="font-extrabold mb-[3rem]">{newQuiz.title}</h2>
            <div className="flex gap-[3rem] max-[1100px]:flex-col">
                    <div className="max-w-[670px] max-[1100px]:max-w-full max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                        {
                            newQuiz.coverImageUrl ? (
                                <Image
                                src={newQuiz.coverImageUrl}
                                width={670}
                                height={380}
                                alt="Quiz Cover"
                                className="max-w-[670px] h-[380px] object-cover rounded-[1rem] border-light-2 border-[5px] mb-[3rem] max-sm:h-[300px]"
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
                            {newQuiz.description}
                        </p>
                    </div>
                </div>
                <div className="bg-white border-[5px] border-gray p-[3rem] rounded-[1rem] w-full h-min max-[1100px]:max-w-[600px] max-[1100px]:mx-auto">
                    <div className="flex flex-col gap-[2.5rem] mb-[3rem]">
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">{data?.emoji} {data?.title}</h4>
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">👤 от
                            <span className="text-blue-1"> {newQuiz.author}</span>
                        </h4>
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">❓ Вопросы: {newQuiz.questionsAmount}</h4>
                        <p className="text-gray text-[1.6rem]">
                            {
                                newQuiz.tags && newQuiz.tags.map((tag: string) => {
                                    return <span key={tag} className="capitalize">{tag}. </span>;
                                })
                            }
                        </p>
                    </div>
                    <div className="flex gap-[1rem] max-sm:flex-col">
                        <div className="w-full">
                            <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem]">
                            Начать
                            <Triangle />
                        </Button>
                    </div>
                        <IconButton type="blue">
                            <Share />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default QuizMainInfoPreview;