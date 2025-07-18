import Image from "next/image";
import Link from "next/link";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";

export default function SingleQuiz() {
    return (
        <SectionWithHeader bigTitle="Готовы к вызову?">
            <h2 className="text-[3rem] font-extrabold mb-[3rem]">Названия квиза</h2>
            <div className="flex gap-[3rem] max-[1100px]:flex-col">
                <div className="max-w-[670px] max-[1100px]:max-w-full max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                    <Image
                    src='/images/placeholder.png'
                    width={670}
                    height={380}
                    alt="Quiz Cover"
                    className="max-w-[100%] h-[380px] object-cover rounded-[1rem] border-light-2 border-[5px] mb-[3rem] max-sm:h-[300px]"
                    />
                    <div>
                        <h3 className="text-[2.4rem] font-extrabold mb-[1.5rem]">Описание</h3>
                        <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                            className="text-[2rem] font-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget sollicitudin nunc, elementum vehicula odio. Cras mi turpis, volutpat in faucibus in, auctor vitae massa. Maecenas ac placerat lorem. Donec et orci at elit auctor tristique. Integer aliquet, turpis a tempor ultrices, mauris sem pellentesque purus, non blandit enim eros eget eros. Mauris ac turpis rhoncus arcu pharetra iaculis.
                        </p>
                    </div>
                </div>
                <div className="bg-white border-[5px] border-gray p-[3rem] rounded-[1rem] w-full h-min max-[1100px]:max-w-[600px] max-[1100px]:mx-auto">
                    <div className="flex flex-col gap-[2.5rem] mb-[3rem]">
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">💬 Категория</h4>
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">👤 от Автора</h4>
                        <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                        className="text-[2.4rem] font-bold">❓ Вопросы: 15</h4>
                        <p className="text-gray text-[1.6rem]">Животные, Природа, Зоология</p>
                    </div>
                    <div className="flex gap-[1rem] max-sm:flex-col">
                        <div className="w-full">
                            <Link href='/quizzes/atempt/quizID'>
                                <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem]">
                                    Начать
                                    <Triangle />
                                </Button>
                            </Link>
                        </div>
                        <IconButton type="blue">
                            <Share />
                        </IconButton>
                    </div>
                </div>
            </div>
        </SectionWithHeader>
    )
}