'use client';

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import SectionWithHeader from "@/components/layouts/sectionWithHeader"
import FormInput from "@/components/ui/formInput";
import Button from "@/components/ui/button";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import BaseModal from "@/components/ui/baseModal";

const ResetFormSchema = z.object({
    'email-for-reset': z.string().email({ message: 'Некорректный адресс эл. почты' }),
});

type ResetFormType = z.infer<typeof ResetFormSchema>;

export default function ResetPssword() {
    const { replace } = useRouter();
    const { resetPassword } = useAuth();
    const { showModal, openModal, closeModal } = useModal(); 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetFormType>({
        resolver: zodResolver(ResetFormSchema)
    });

    const onSubmit = (data: ResetFormType) => {
        resetPassword(data["email-for-reset"]);
        openModal();
    };

    const onModalAccept = () => {
        closeModal();
        replace('/login');
    }

    return (
        <SectionWithHeader bigTitle="Сброс пароля">
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center pt-[5rem]">
                <p style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}
                className="font-medium text-center mb-[5rem] max-w-[600px]">Напишите эл. почту вашего аккаунта чтобы мы могли отправить вам письмо для сброса пароля!</p>
                <div className="max-w-[600px] w-full flex flex-col gap-[2rem]">
                    <FormInput
                    type="email"
                    name="email-for-reset"
                    placeholder="Введите эл. почту"
                    register={register}
                    errors={errors}
                    />
                    <Button type="blue">Сбросить пароль</Button>
                </div>
            </form>
            <BaseModal
            onClose={closeModal}
            onConfirm={onModalAccept}
            modalActive={showModal}
            type="accept"
            title="Письмо отправлено"
            description='Мы отправили письмо вам на эл. почту, пожалуйста проверьте её! Если не можете найти, проверьте вкладку "Спам"'
            buttonText="Хорошо"/>
        </SectionWithHeader>
    )
}