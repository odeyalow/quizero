'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

import Share from "@/assets/share";

import useGetUser from "@/hooks/useGetUser";
import quizzesService from "@/services/quizzesService";
import useGetData from "@/hooks/useGetData";
import { QuizDataType } from "@/types/QuizDataType";

export default function OtherProfile() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData, isPending } = useGetUser(userId ?? '');
    const { data: quizzesData } = useGetData<QuizDataType>(
        `${userId ?? ''}-user-quizzes`,
        () => quizzesService.getByIds(userData!.createdQuizzes),
        { enabled: !!(userId && userData) }
    )
    const userPfpURL = userData?.photoURL ?? '/images/user-pfp-placeholder.svg';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setUserId(params.get("id"));
    }, []);

    const getPersentOfCorrectAnswers = () => {
        if ( userData && userData?.allAnswersAmount !== 0 ) {
            return Math.round((userData?.correctAnswersAmount / userData?.allAnswersAmount) * 100);
        } else {
            return 0;
        }
    }
    const shareUserProfile = async () => {
        const shareUrl = `/user?id=${userId}`;

        if (navigator.share) {
            await navigator.share({
            title: `${userData?.username} в Quizero`,
            text: 'Посмотрите профиль этого пользователя!',
            url: shareUrl,
            });
        } else {
            await navigator.clipboard.writeText(shareUrl);
            alert('Ссылка скопирована!');
        }
    };

    if ( isPending ) { return <Spinner /> }
    if ( !userId || !userData ) {
        return (
            <div className="flex flex-col items-center pt-[10rem] text-center px-[25px] mb-[10rem]">
                <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                    className="font-extrabold">Похоже такого профиля не существует😅</h1>
                <div className="flex items-center gap-[2rem] max-sm:flex-col-reverse mt-[5rem]">
                    <Button onClick={() => router.back()} type='yellow'>Назад</Button>
                    <Link href='/'>
                        <Button type='yellow'>На главную</Button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <SectionWithHeader bigTitle={`Профиль пользователя`}>
            <div className="flex gap-[5rem] max-lg:flex-col max-lg:items-center">
            <div className="flex w-full flex-col items-center gap-[2.5rem] max-w-[400px]">
                <div className="relative">
                    <Image
                    priority
                    src={userPfpURL}
                    width={400}
                    height={400}
                    alt="Profile Picture"
                    className="h-[400px] rounded-[1.5rem]
                        max-lg:h-[100%] max-lg:max-w-[100%] aspect-square
                        object-cover border-[5px] border-light-2" />
                </div>
                <h2 style={{fontSize: 'clamp(1.5rem, 7vw, 3rem)'}}
                    className="text-yellow-1 text-[3rem] font-extrabold">{userData.username}</h2>
            </div>
            <div className="w-full h-min bg-white border-[5px] border-gray rounded-[1.5rem] p-[3rem] flex flex-col items-start max-sm:items-center">
                <h3 className="text-[3rem] font-extrabold mb-[1rem]">Статистика</h3>
                <div className="flex flex-col gap-[1rem] mb-[3rem] max-md:leading-[5rem] max-sm:text-center">
                    <h6 className="text-[2.4rem] font-regular">✅ Пройдено квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{userData?.passedQuizzes.length}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">✏ Создано квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{userData?.createdQuizzes.length}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">📈 Процент правильных ответов: <strong className="font-extrabold text-[4rem] text-yellow-1">{getPersentOfCorrectAnswers()}%</strong></h6>
                </div>
                <div className="w-full">
                    <Button type="blue" onClick={shareUserProfile} styles="flex items-center justify-center gap-[1rem]">
                        Поделиться профилем
                        <Share />
                    </Button>
                </div>
            </div>
            </div>
            <div className="w-full h-[3px] bg-light-2 rounded my-[5rem]"></div>
            <div>
                <h3 className="text-[3.5rem] font-extrabold text-center mb-[5rem]">Созданные квизы</h3>
                {
                    userData && userData?.createdQuizzes.length > 0 ? (
                        <QuizzesGrid quizzes={quizzesData ?? []}/>
                    ) : <h6 className="text-[2.4rem] font-regular text-center">У этого пользователя пока нет созданных квизов.</h6>
                }
            </div>
        </SectionWithHeader>
    )
}