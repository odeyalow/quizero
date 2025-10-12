'use client';

import Button from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center pt-[10rem] text-center px-[25px] mb-[20rem]">
            <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                className="font-extrabold">Упс... Вы попали на несуществующую страницу!😅</h1>
            <div className="flex items-center gap-[2rem] max-sm:flex-col-reverse mt-[5rem]">
                <Button onClick={() => router.back()} type='yellow'>Назад</Button>
                <Link href='/'>
                    <Button type='yellow'>На главную</Button>
                </Link>
            </div>
        </div>
    )
}
 
export default NotFound;