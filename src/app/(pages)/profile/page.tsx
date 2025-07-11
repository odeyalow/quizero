import Image from "next/image";

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Edit from "@/assets/edit";

export default function Profile() {
    return (
        <SectionWithHeader bigTitle="Профиль">
            <div className="flex gap-[5rem] max-lg:flex-col max-lg:items-center">
                <div className="flex w-full flex-col items-center gap-[2.5rem] max-w-[400px]">
                    <div className="relative">
                        <Image
                        src='/images/placeholder.png'
                        width={600}
                        height={400}
                        alt="Profile"
                        className="h-[400px] rounded-[1.5rem]
                            max-lg:h-[100%] max-lg:max-w-[100%] aspect-square
                            object-cover border-[5px] border-gray" />
                        <div className="absolute bottom-5 right-5 opacity-50 hover:opacity-100">
                            <IconButton type="gray">
                                <Edit />
                            </IconButton>
                        </div>
                    </div>
                    <h2 style={{fontSize: 'clamp(1.5rem, 7vw, 3rem)'}}
                        className="text-yellow-1 text-[3rem] font-extrabold">имя_пользователя</h2>
                </div>
                <div className="w-full h-min bg-white border-[5px] border-gray rounded-[1.5rem] p-[3rem] flex flex-col items-start max-sm:items-center">
                    <h3 className="text-[3rem] font-extrabold mb-[1rem]">Статистика</h3>
                    <div className="flex flex-col gap-[1rem] mb-[3rem] max-md:leading-[5rem] max-sm:text-center">
                        <h6 className="text-[2.4rem] font-regular">✅ Пройден квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">4</strong></h6>
                        <h6 className="text-[2.4rem] font-regular">✏ Создано квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">2</strong></h6>
                        <h6 className="text-[2.4rem] font-regular">📈 Процент правильных ответов: <strong className="font-extrabold text-[4rem] text-yellow-1">82%</strong></h6>
                    </div>
                    <div className="w-full"><Button type="blue">Поделиться</Button></div>
                </div>
            </div>
            <div className="w-full h-[5px] bg-light-2 rounded my-[5rem]"></div>
            <div>
                <h3 className="text-[3.5rem] font-extrabold text-center mb-[5rem]">Созданные квизы</h3>
                <QuizzesGrid />
            </div>
        </SectionWithHeader>
    )
}