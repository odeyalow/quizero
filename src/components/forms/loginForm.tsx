'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Input from "../ui/input";
import Button from "../ui/button";

const LoginSchema = z.object({
    email: z.string().email({ message: 'Некорректный адресс эл. почты' }),
    password: z.string().min(1, { message: 'Обезательное поле'}),
});

type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = (data: LoginType) => {
        console.log(data)
    };
    
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
        <Button type="yellow">Войти</Button>
       </form>
    );
}
 
export default LoginForm;