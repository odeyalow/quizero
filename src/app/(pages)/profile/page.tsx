'use client';

import Image from "next/image";
import Link from "next/link";

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "../../../components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Edit from "@/assets/edit";

import { useAuthData } from "@/components/layouts/authProvider";
import useGetUser from "@/hooks/useGetUser";

export default function Profile() {
    const user = useAuthData();
    const { data } = useGetUser(user.user?.uid);

    const userPfpURL = user.user?.photoURL ?? '/images/user-pfp-placeholder.svg';

    const getPersentOfCorrectAnswers = () => {
        if ( data && data?.allAnswersAmount !== 0 ) {
            return Math.round((data?.correctAnswersAmount / data?.allAnswersAmount) * 100);
        } else {
            return 0;
        }
    }
    
    if ( !user.user ) {
        return (
             <div className="flex flex-col items-center pt-[10rem] text-center px-[25px]">
                <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                    className="font-extrabold mb-[1rem]">Неловко вышло... Похоже вы еще не авторизовались😅</h1>
                <p  style={{fontSize: 'clamp(1rem, 3vw, 1.8rem)'}}
                    className="mb-[3rem]">
                    Пожалуйста войдите в свой аккаунт или создайте новый чтобы вы могли посмотреть свой профиль!
                </p>
                <div className="flex items-center gap-[2rem] max-sm:flex-col-reverse">
                    <Link href='/login'>
                        <Button type='yellow'>Войти</Button>
                    </Link>
                    <span className="text-light-2 font-extrabold text-[2rem]">ИЛИ</span>
                    <Link href='/register'>
                        <Button type='yellow'>Зарегистрироваться</Button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <SectionWithHeader bigTitle="Профиль">
            <div className="flex gap-[5rem] max-lg:flex-col max-lg:items-center">
            <div className="flex w-full flex-col items-center gap-[2.5rem] max-w-[400px]">
                <div className="relative">
                    <Image
                    src={userPfpURL as string}
                    width={600}
                    height={400}
                    alt="Profile Picture"
                    className="h-[400px] rounded-[1.5rem]
                        max-lg:h-[100%] max-lg:max-w-[100%] aspect-square
                        object-cover border-[5px] border-light-2" />
                    <div className="absolute bottom-5 right-5 opacity-50 hover:opacity-100">
                        <IconButton type="gray">
                            <Edit />
                        </IconButton>
                    </div>
                </div>
                <h2 style={{fontSize: 'clamp(1.5rem, 7vw, 3rem)'}}
                    className="text-yellow-1 text-[3rem] font-extrabold">{user.user?.displayName}</h2>
            </div>
            <div className="w-full h-min bg-white border-[5px] border-gray rounded-[1.5rem] p-[3rem] flex flex-col items-start max-sm:items-center">
                <h3 className="text-[3rem] font-extrabold mb-[1rem]">Статистика</h3>
                <div className="flex flex-col gap-[1rem] mb-[3rem] max-md:leading-[5rem] max-sm:text-center">
                    <h6 className="text-[2.4rem] font-regular">✅ Пройдено квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{data?.passedQuizzes.length}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">✏ Создано квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{data?.createdQuizzesAmount}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">📈 Процент правильных ответов: <strong className="font-extrabold text-[4rem] text-yellow-1">{getPersentOfCorrectAnswers()}%</strong></h6>
                </div>
                <div className="w-full"><Button type="blue">Поделиться профилем</Button></div>
            </div>
            </div>
            <div className="w-full h-[3px] bg-light-2 rounded my-[5rem]"></div>
            <div>
                <h3 className="text-[3.5rem] font-extrabold text-center mb-[5rem]">Созданные квизы</h3>
                {
                    data && data?.createdQuizzes.length > 0 ? (
                        <QuizzesGrid quizzes={data.createdQuizzes}/>
                    ) : (
                        <div className="flex flex-col items-center gap-[3rem]">
                            <h6 className="text-[2.4rem] font-regular">У вас пока нет созданных квизов.</h6>
                            <Link href='create-quiz'>
                                <Button type="yellow">Создать</Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </SectionWithHeader>
    )
}