'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Button from "../../../components/ui/button";
import IconButton from "@/components/ui/iconButton";
import Input from "@/components/ui/input";

import Edit from "@/assets/edit";

import { useAuthData } from "@/components/layouts/authProvider";
import useGetUser from "@/hooks/useGetUser";
import quizzesService from "@/services/quizzesService";
import userService from "@/services/userService";
import useGetData from "@/hooks/useGetData";
import { QuizDataType } from "@/types/QuizDataType";
import useUpdateData from "@/hooks/useUpdateData";
import Trash from "@/assets/trash";
import Cross from "@/assets/cross";

export default function Profile() {
    const user = useAuthData();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [pfp, setPfp] = useState<File | null>();
    const { data: userData } = useGetUser(user.user?.uid);
    const { data: quizzesData } = useGetData<QuizDataType>(
        `${user.user?.uid}-own-quizzes`,
        () => quizzesService.getByIdsWithPrivates(userData!.createdQuizzes),
        { enabled: !!(user.user && userData) }
    )
    const pictureAdd = useUpdateData(() => userService.updateProfilePicture(user.user?.uid!, pfp!), ['user', user.user?.uid]);
    const pictureRemove = useUpdateData(() => userService.removeProfilePicture(user.user?.uid!, userData?.photoURL!));
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>('');
    const { mutate, isSuccess, isPending, isError } = useUpdateData(() => userService.updateUsername(user.user?.uid!, newUsername));
    
    useEffect(() => {
        if ( pfp ) {
            pictureAdd.mutate();
        }
    }, [pfp])

    const userPfpURL = userData?.photoURL ?? '/images/user-pfp-placeholder.svg';

    const getPersentOfCorrectAnswers = () => {
        if ( userData && userData?.allAnswersAmount !== 0 ) {
            return Math.round((userData?.correctAnswersAmount / userData?.allAnswersAmount) * 100);
        } else {
            return 0;
        }
    }
    const handlePfpRemove = () => {
        pictureRemove.mutate();
        setPfp(null);
    }
    const shareMyProfile = async () => {
        const shareUrl = `/user?id=${user.user?.uid}`;

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

    useEffect(() => {
        if ( isSuccess ) {
            setIsEditingUsername(false);
            setNewUsername('');
        }
    }, [isSuccess])

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
        <SectionWithHeader bigTitle="Ваш профиль">
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
                    <div className="absolute bottom-5 right-5 opacity-50 hover:opacity-100 flex gap-[1rem]">
                        <IconButton type="gray" onClick={() => fileInputRef.current?.click()}>
                            <Edit />
                        </IconButton>
                        {
                            userData?.photoURL && (
                                <IconButton type="red" onClick={handlePfpRemove}>
                                    <Trash />
                                </IconButton>
                            )
                        }
                    </div>
                    <input
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setPfp(file);
                    }}
                    type="file"
                    className="hidden"/>
                </div>
                {
                    isEditingUsername ? (
                        <div className="flex gap-[1rem]">
                            <Input
                            type="text"
                            value={newUsername}
                            placeholder="Введите имя пользователя"
                            name="username"
                            onChange={setNewUsername}/>
                            <IconButton
                            disabled={!newUsername.trim()}
                            type="blue"
                            onClick={() => newUsername.trim() && mutate()}>
                                <Edit />
                            </IconButton>
                            <IconButton type="gray" onClick={() => {
                                setIsEditingUsername(false);
                                setNewUsername('');
                            }}>
                                <Cross />
                            </IconButton>
                        </div>
                    ) : (
                        <div className="flex items-center gap-[1.5rem]">
                            <h2 style={{fontSize: 'clamp(1.5rem, 7vw, 3rem)'}}
                            className="text-yellow-1 text-[3rem] font-extrabold">{userData?.username || user.user.displayName}</h2>
                            <IconButton type="gray" onClick={() => setIsEditingUsername(true)}>
                                <Edit />
                            </IconButton>
                        </div>
                    )
                }
            </div>
            <div className="w-full h-min bg-white border-[5px] border-gray rounded-[1.5rem] p-[3rem] flex flex-col items-start max-sm:items-center">
                <h3 className="text-[3rem] font-extrabold mb-[1rem]">Статистика</h3>
                <div className="flex flex-col gap-[1rem] mb-[3rem] max-md:leading-[5rem] max-sm:text-center">
                    <h6 className="text-[2.4rem] font-regular">✅ Пройдено квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{userData?.passedQuizzes.length}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">✏ Создано квизов: <strong className="font-extrabold text-[4rem] text-yellow-1">{userData?.createdQuizzes.length}</strong></h6>
                    <h6 className="text-[2.4rem] font-regular">📈 Процент правильных ответов: <strong className="font-extrabold text-[4rem] text-yellow-1">{getPersentOfCorrectAnswers()}%</strong></h6>
                </div>
                <div className="w-full">
                    <Button type="blue" onClick={shareMyProfile}>Поделиться профилем</Button>
                </div>
            </div>
            </div>
            <div className="w-full h-[3px] bg-light-2 rounded my-[5rem]"></div>
            <div>
                <h3 className="text-[3.5rem] font-extrabold text-center mb-[5rem]">Созданные квизы</h3>
                {
                    userData && userData?.createdQuizzes.length > 0 ? (
                        <QuizzesGrid quizzes={quizzesData ?? []}/>
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