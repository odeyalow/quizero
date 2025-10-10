'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Section from "@/components/layouts/section";
import Button from "../../../components/ui/button";

import Triangle from "@/assets/triangle";
import Share from "@/assets/share";

import useUpdateUser from "@/hooks/useUpdateData";
import userService from "@/services/userService";
import { useAuthData } from "@/components/layouts/authProvider";
import useGetUser from "@/hooks/useGetUser";

export default function QuizResult() {
    const router = useRouter();
    const [quizId, setQuizId] = useState<string | null>(null);
    const [quizSlug, setSlug] = useState<string | null>(null);
    const [allQuestionsAmount, setAllQuestionsAmount] = useState(0);
    const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
    const { user } = useAuthData();
    const { data: userData, isFetched, refetch } = useGetUser(user?.uid);

    const data = useUpdateUser(async () => {
        if (!user?.uid || !quizId) return;

        const freshUserData = await refetch();
        if (!freshUserData.data?.passedQuizzes.includes(quizId)) {
            await userService.updateOnQuizComplete(
                user.uid,
                quizId,
                correctAnswersAmount,
                allQuestionsAmount
            );
        }
    }, ["user", user?.uid]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const all = sessionStorage.getItem(`quiz-${quizId}-allQuestionsAmount`);
            const correct = sessionStorage.getItem(`quiz-${quizId}-correctAnswersAmount`);

            setAllQuestionsAmount(all ? Number(all) : 0);
            setCorrectAnswersAmount(correct ? Number(correct) : 0);
        }
    }, [quizId]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setQuizId(params.get("id"));
        setSlug(params.get("slug"));
    }, []);

    useEffect(() => {
        if (!userData || !quizId) return;
        if (!isFetched || !userData) return;

        const isAlreadyPassed = userData.passedQuizzes.includes(quizId);
        if (!isAlreadyPassed && !data.isPending && !data.isSuccess) {
            data.mutate();
        }
    }, [userData, quizId]);;

    useEffect(() => {
        if ( !quizId ) router.back();
    }, [quizId])

    return (
        <Section styles="my-[15rem]">
            <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.6rem)'}}
                className="text-center font-extrabold mb-[3rem]">Результаты квиза</h1>
            <div className="mx-auto  bg-white border-[5px] border-gray rounded-[2rem] p-[3rem] max-w-[750px]">
                <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                className="text-yellow-1 font-extrabold mb-[1.5rem]">Отличный результат!</h2>
                <p style={{fontSize: 'clamp(1rem, 5vw, 2.4rem)'}}
                className="font-semibold mb-[1.5rem]">
                    🎉 Вы ответили правильно на 
                    <strong className="text-yellow-1"> {correctAnswersAmount} </strong>
                    вопросов из {allQuestionsAmount}!</p>
                <p style={{fontSize: 'clamp(1rem, 5vw, 2.4rem)'}}
                className="text-[2.4rem] text-gray font-semibold mb-[3rem]">Мы сохраняем в вашем профиле информацию о пройденных квизах, но учитываем только первое прохождение.</p>
                <div className="flex gap-[1.5rem] max-sm:flex-col">
                    <div className="w-full">
                        <Button
                            onClick={() => router.replace(`/quizzes/${quizSlug}?id=${quizId}`)}
                            type="yellow"
                            styles="flex justify-center items-center gap-[0.5rem] text-[2rem] w-full">
                            Пройти заново
                            <Triangle />
                        </Button>
                    </div>
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