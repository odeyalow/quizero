import Link from "next/link"

import SectionWithHeader from "@/components/layouts/sectionWithHeader"
import LoginForm from "@/components/forms/loginForm"
import Button from "@/components/ui/button"

export default function Login() {
    return (
        <SectionWithHeader bigTitle="Вход">
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                className="text-yellow-1 font-extrabold text-center mb-[5rem]">Рады вас снова видеть!</h2>
            <div className="max-w-[600px] mx-auto">
                <LoginForm />
                <div className="flex gap-[1rem] items-center my-[3rem]">
                    <div className="w-full h-[3px] bg-light-2 rounded"></div>
                    <span className="text-light-2 font-extrabold text-[2rem]">ИЛИ</span>
                    <div className="w-full h-[3px] bg-light-2 rounded"></div>
                </div>
                <Button type="dark">
                    Войти через Google
                </Button>
                <div className="text-[1.8rem] flex justify-between mt-[3rem]">
                    <Link href='reset-password' className="hover:text-yellow-1">Забыли пароль?</Link>
                    <Link href='register' className="hover:text-yellow-1">Регистрация</Link>
                </div>
            </div>
        </SectionWithHeader>
    )
}