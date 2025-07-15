import Image from "next/image";

import Section from "@/components/layouts/section";
import Button from "@/components/ui/button";

import Arrow from "@/assets/arrow";
import Cross from "@/assets/cross";

export default function QuizAtempt() {
    return (
        <Section styles="mb-[10rem]">
            <div>
                <div className="mb-[5rem]">
                    <span style={{fontSize: 'clamp(2rem, 7vw, 2.4rem)'}}
                        className="text-[2.4rem] font-semibold mb-[1.5rem] block">Вопрос 3 из 15</span>
                    <div className="bg-yellow-2 w-full h-[20px] rounded-full p-[0.4rem]">
                        <div className="bg-yellow-1 max-w-[250px] h-full rounded-full"></div>
                    </div>
                </div>
                <div className="bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-sm:p-[1.5rem]">
                    <Image
                    src='/images/placeholder.png'
                    width={1000}
                    height={600}
                    alt="Quiz Cover"
                    className="w-full h-[600px] object-cover rounded-[1rem] max-md:h-[300px]"
                    />
                    <h2 style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)'}}
                        className="text-[3rem] font-extrabold my-[3rem]">Текст вопросы</h2>
                    <div className="flex flex-col gap-[2rem]">
                        <Button type="gray" styles="text-left text-[2rem]">Текст вопроса</Button>
                        <Button type="gray" styles="text-left text-[2rem]">Текст вопроса</Button>
                        <Button type="green" active styles="text-left text-[2rem]">Текст вопроса</Button>
                        <Button type="red" active styles="text-left text-[2rem]">Текст вопроса</Button>
                    </div>
                </div>
                <div className="flex justify-between mt-[3rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem] max-[350px]:mt-[10rem]">
                    <Button type="red" styles="flex items-center gap-[0.5rem] h-full justify-center">
                        Покинуть квиз
                        <Cross styles="max-w-[25px] h-[25px]"/>
                    </Button>
                    <Button type="blue" styles="flex items-center gap-[0.5rem] h-full justify-center">
                        Дальше
                        <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                    </Button>
                </div>
            </div>
        </Section>
    )
}