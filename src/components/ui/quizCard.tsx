import Link from "next/link";
import Image from "next/image";

import Button from "./button";

import Verified from "@/assets/verified";

interface QuizCardProps {
    imageUrl?: string
    slug: string
    title: string;
    author: string;
    authorConfirmed: boolean
}

const QuizCard:React.FC<QuizCardProps> = ({ imageUrl, author, authorConfirmed, slug, title }) => {
    return (
        <div
        className="relative">
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
                <div className="flex items-center gap-[0.5rem] mb-[2rem]">
                    <h3 className="text-[2rem] font-extrabold text-gray">от {author}</h3>
                    {
                        authorConfirmed && (
                            <Verified />
                        )
                    }
                </div>
                <Link href={`quizzes/${slug}`} className="w-full">
                    <Button type="blue" styles="text-[2rem]">Пройти</Button>
                </Link>
            </div>
            <div className={`absolute bottom-0 z-[0] rounded-b-[20px] w-full h-[30px] bg-gray`}></div>
        </div>
    );
}
 
export default QuizCard;