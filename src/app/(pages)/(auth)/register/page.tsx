import Link from "next/link"

import SectionWithHeader from "@/components/layouts/sectionWithHeader"
import RegistrationForm from "@/components/forms/registrationForm"
import Button from "../../../../components/ui/button"

export default function Register() {
    return (
        <SectionWithHeader bigTitle="Регистрация">
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                className="text-yellow-1 text-[3rem] font-extrabold text-center mb-[5rem]">Добро пожаловать!</h2>
            <div className="max-w-[600px] mx-auto">
                <RegistrationForm />
                <div className="flex gap-[1rem] items-center my-[3rem]">
                    <div className="w-full h-[3px] bg-light-2 rounded"></div>
                    <span className="text-light-2 font-extrabold text-[2rem]">ИЛИ</span>
                    <div className="w-full h-[3px] bg-light-2 rounded"></div>
                </div>
                <Button type="dark">
                    Регистрация через Google
                </Button>
                <div className="text-[1.8rem] flex justify-center mt-[3rem]">
                    <Link href='login' className="hover:text-yellow-1">Уже есть аккаунт?</Link>
                </div>
            </div>
        </SectionWithHeader>
    )
}