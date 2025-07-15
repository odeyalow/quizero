import Link from "next/link";

import Section from "@/components/layouts/section";
import Button from "@/components/ui/button";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";

export default function QuizResult() {
    return (
        <Section>
            <div className="mx-auto mt-[15rem] bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-w-[750px]">
                <h1 className="text-yellow-1 text-[3rem] font-extrabold mb-[1.5rem]">Отличный результат!</h1>
                <p className="text-[2.4rem] font-semibold mb-[1.5rem]">🎉Вы ответили правильно на <strong className="text-yellow-1">9</strong> вопросов из 15!</p>
                <p className="text-[2.4rem] text-gray font-semibold mb-[3rem]">Информация о прохождений вами квизов сохраняется в вашем профиле.</p>
                <div className="flex gap-[1.5rem]">
                    <Link href='/quizzes/atempt/quizID' className="block w-full">
                        <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem] text-[2rem] w-full">
                            Начать
                            <Triangle />
                        </Button>
                    </Link>
                    <div className="w-full">
                        <Button type="blue" styles="flex justify-center items-center gap-[1rem] text-[2rem]">
                            Поделиться результатом
                            <Share />
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    )
}