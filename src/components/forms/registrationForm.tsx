'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Input from "../ui/input";
import Button from "../ui/button";

import useAuth from "@/hooks/useAuth";

const RegistrationSchema = z.object({
    username: z.string().min(3, { message: 'Имя пользователя должна быть более 3 символов' }),
    email: z.string().email({ message: 'Некорректный адресс эл. почты' }),
    password: z.string().min(8, { message: 'Пароль должен содержать не менее 8 символов'}),
    password_confirmation: z.string()
}).refine(
    (values) => values.password === values.password_confirmation,
    { 
        message: 'Пароли не совпадают',
        path: ['password_confirmation']
    }
)

type RegistrationType = z.infer<typeof RegistrationSchema>;

const RegistrationForm = () => {
    const { errorMessage, registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegistrationType>({
        resolver: zodResolver(RegistrationSchema)
    });

    const onSubmit = (data: RegistrationType) => {
        registerUser(data.email, data.password, data.username);
    };

    return (
       <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit(onSubmit)}>
        <Input
            register={register}
            errors={errors}
            type="text"
            name="username"
            placeholder="Введите имя пользователя"
            label="Имя пользователя" />
        <Input
            register={register}
            errors={errors}
            type="email"
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
        <Input
            register={register}
            errors={errors}
            type="password"
            name="password_confirmation"
            placeholder="Введите пароль повторно"
            label="Подтверждение пароля"/>
            <Button type="yellow">Зарегистрироваться</Button>
        { errorMessage && <strong className="text-red-1 text-[1.6rem] mt-[-1rem]">{errorMessage}</strong> }
       </form>
    );
}
 
export default RegistrationForm;