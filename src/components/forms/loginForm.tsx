'use client';

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Input from "../ui/input";
import Button from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { useAuthData } from "../layouts/authProvider";

const LoginSchema = z.object({
    email: z.string().email({ message: 'Некорректный адресс эл. почты' }),
    password: z.string().min(1, { message: 'Обезательное поле'}),
});

type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
    const { push } = useRouter();
    const { formErrorMessage, loginUser } = useAuth();
    const { user } = useAuthData();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema)
    });

    useEffect(() => { if (user) push('/') }, [user]);
    useEffect(() => { if (formErrorMessage) reset()}, [formErrorMessage])

    const onSubmit = (data: LoginType) => {
        loginUser(data.email, data.password);
    };

    const isButtonDisabled = formErrorMessage !== '';
    
    return (
       <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit(onSubmit)}>
        <Input
            register={register}
            errors={errors}
            type="text"
            name="email"
            placeholder="Введите эл. почту"
            label="Эл. почта" />
        <Input
            register={register}
            errors={errors}
            type="password"
            name="password"
            placeholder="Введите ваш пароль"
            label="Пароль"/>
        { formErrorMessage && <strong className="text-red-1 text-[1.6rem] mt-[-1rem]">{formErrorMessage}</strong> }
        <Button
            disabled={isButtonDisabled}
            type="yellow">Войти</Button>
       </form>
    );
}
 
export default LoginForm;