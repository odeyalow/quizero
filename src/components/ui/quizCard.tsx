import Link from "next/link";
import Image from "next/image";

import Button from "./button";

import useModal from "@/hooks/useModal";
import useGetSingleData from "@/hooks/useGetSingleData";
import categoriesService from "@/services/categoriesService";
import CategoryDataType from "@/types/CategoryDataType";
import { usePathname } from "next/navigation";

interface QuizCardProps {
    id: string;
    imageUrl?: string
    slug: string
    title: string;
    author: string;
    category: string;
    description: string;
    questionsAmount: number;
}

const QuizCard:React.FC<QuizCardProps> = ({ id, imageUrl, author, slug, title, category, description, questionsAmount }) => {
    const { showModal, openModal, closeModal } = useModal();
    const pathname = usePathname();
    const { data } = useGetSingleData<CategoryDataType | null>(`category-${category}`, () => categoriesService.getById(category));

    const linkHref = {
        pathname: `/quizzes/${slug}`,
        query: {
            id: id,
        }
    }

    return (
        <>
            <div
            className="relative"
            onClick={openModal}>
                <div
                className={`
                    flex flex-col justify-center items-start
                    translate-y-[-5px] cursor-pointer relative z-2
                    w-full p-[3rem] max-md:p-[2rem]
                    border-[5px] rounded-[20px] border-gray
                    active:translate-y-0 hover:translate-y-[-10px]
                    bg-white
                `}>
                    {
                        imageUrl ? (
                            <Image
                                className="w-full h-[150px] max-md:h-[200px] object-cover rounded-[1rem]"
                                src={imageUrl}
                                width={300}
                                height={150}
                                alt='Quiz'
                            ></Image>
                        ) : (
                            <div className="
                                text-center
                                w-full h-[150px] max-md:h-[200px] 
                                rounded-[1rem] bg-light-1 p-[1rem]
                                border-dark-1 border-[3px] border-dashed
                                flex flex-col justify-center items-center gap-[1rem]">
                                <span className="text-[3rem] text-dark-1 font-bold">Упс...</span>
                                <span className="text-[2rem] text-dark-1 font-meduim">👀Картинки нет!</span>
                            </div>
                        )
                    }
                    <h2 style={{fontSize: 'clamp(2rem, 5vw, 2.5rem)'}}
                        className="text-[3rem] font-extrabold text-dark-1 mt-[2rem] mb-[1.5rem]">{title}</h2>
                    <div className="flex items-center gap-[0.5rem]">
                        <h3 className="text-[2rem] font-extrabold text-gray">от {author}</h3>
                    </div>
                    {
                        pathname === '/quizzes' && (
                            <h3 style={{fontSize: 'clamp(2rem, 5vw, 2rem)'}}
                                className="font-extrabold text-gray mt-[2rem]">
                                {data?.emoji} {data?.title}
                            </h3>
                        )
                    }
                    <Link href={linkHref} className="w-full mt-[2.5rem]">
                        <Button type="blue" styles="text-[2rem]">Пройти</Button>
                    </Link>
                </div>
                <div className={`absolute bottom-0 z-[0] rounded-b-[20px] w-full h-[30px] bg-gray`}></div>
            </div>
            {
                showModal && (
                    <div className="bg-black/40 fixed inset-0 z-999 grid place-items-center px-[2.5rem] w-full overflow-y-scroll py-[3rem]">
                        <div className="bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-w-[700px]">
                            {
                                imageUrl ? (
                                <Image
                                    className="w-full h-[350px] max-md:h-[200px] object-cover rounded-[1rem]"
                                    src={imageUrl}
                                    width={640}
                                    height={350}
                                    alt='Quiz'
                                ></Image>
                                ) : (
                                    <div className="
                                        text-center
                                        w-full h-[150px] max-md:h-[200px] 
                                        rounded-[1rem] bg-light-1 p-[1rem]
                                        border-dark-1 border-[3px] border-dashed
                                        flex flex-col justify-center items-center gap-[1rem]">
                                        <span className="text-[3rem] text-dark-1 font-bold">Упс...</span>
                                        <span className="text-[2rem] text-dark-1 font-meduim">👀Картинки нет!</span>
                                    </div>
                                )
                            }
                            <h2 style={{fontSize: 'clamp(2rem, 5vw, 2.5rem)'}}
                            className="font-extrabold text-dark-1 mt-[2rem] mb-[3rem]">{title}</h2>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2rem] mb-[3rem]">
                                <span className="text-gray text-[2rem] font-bold">{data?.emoji} {data?.title}</span>
                                <span className="text-gray text-[2rem] font-bold">❓ Вопросы: {questionsAmount}</span>
                                <span className="text-gray text-[2rem] font-bold">👤 от {author}</span>
                            </div>
                            <h3 style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}
                            className="font-extrabold text-dark-1 mt-[2rem] mb-[1.5rem]">Описание</h3>
                            <div className="overflow-y-scroll mb-[3rem] max-h-[200px]">
                                <p style={{fontSize: 'clamp(1.5rem, 3vw, 2rem)'}}
                                >{description}</p>
                            </div>
                            <div className="flex gap-[1.5rem]">
                                <div className="w-[250px]">
                                    <Button type="gray" onClick={closeModal}>Закрыть</Button>
                                </div>
                                <div className="w-full">
                                    <Link href={linkHref} className="w-full">
                                        <Button type="blue">Пройти</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
 
export default QuizCard;