import Link from "next/link";

import Button from "@/components/ui/button";
import Section from "@/components/layouts/section";
import Input from "@/components/ui/input";
import BaseModal from "@/components/ui/baseModal";

export default function Home() {
  return (
    <div className="pt-[5rem] relative max-sm:pt-0">
      <Section styles="mb-[20rem] flex flex-col">
        <h1 style={{fontSize: 'clamp(4rem, 11vw, 6.4rem)'}}
        className="font-extrabold max-w-[800px] mb-[2rem]">Прокачай свои знания вместе c <strong className="text-yellow-1">Quizero!</strong></h1>
        <p style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}
          className="max-w-[650px] mb-[4rem]">
          Квизы это не только развлечение, но и отличный способ расширить кругозор, вспомнить интересные факты и просто хорошо провести время.
        </p>
        <div className="flex gap-[2rem] max-[400px]:flex-col">
          <Link href='/categories'>
            <Button type="yellow">Попробовать</Button>
          </Link>
          <Button type="gray">Узнать больше</Button>
        </div>
        <div className="bg-white border-dark-1 border-[5px] rounded-[2rem] p-[3rem] mx-[2.5rem] max-sm:self-items-center max-w-[560px] absolute z-5 right-0 lg:mt-[-5rem] max-lg:mt-[5rem] max-[300px]:p-[1.5rem]">
          <h3 style={{fontSize: 'clamp(1rem, 6vw, 3rem)'}}
            className="text-[3rem] font-extrabold text-left mb-[4rem] max-[500px]:text-center">🧠Готов напрячь мозги?</h3>
          <div className="flex flex-col gap-[2rem]">
            <Link href='/categories'>
              <Button type="gray">Конечно!</Button>
            </Link>
            <Link href='/categories'>
              <Button type="gray">Я уже готов:)</Button>
            </Link>
            <Link href='/categories'>
              <Button type="gray">Обижаете))</Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section styles="bg-dark-1 w-full pt-[15rem] max-lg:pt-[25rem] md:pb-[26rem]">
        <div className="flex flex-col items-end text-right max-sm:text-center">
          <h1 style={{fontSize: 'clamp(3rem, 11vw, 6.4rem)'}}
          className="text-yellow-1 font-extrabold mb-[2rem]">Множество тем для всех</h1>
          <p style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}
            className="mb-[4rem] text-light-1">
            Кино, музыка, наука, логика, технологии и многое другое — у нас найдётся квиз для каждого. Начни с любимой категории или попробуй что-то новое!
          </p>
          <Link className="max-md:mx-auto" href='/categories'>
              <Button type="yellow">Перейти к темам</Button>
          </Link>
        </div>
        <div className="lg:mt-[-3rem] mt-[5rem] max-md:scale-[75%] max-md:hidden">
          <div className="border-[5px] border-yellow-2 p-[3rem] bg-white rounded-[2rem] absolute ml-[10rem] hover:translate-y-[-25%]  hover:translate-x-[10%] hover:scale-110">
            <h4 className="font-extrabold text-[3rem]">🦁Какое животное на фото?</h4>
          </div>
          <div className="border-[5px] border-yellow-2 p-[3rem] bg-white rounded-[2rem] absolute mt-[8rem] hover:translate-y-[-25%] hover:translate-x-[-10%] hover:scale-110">
            <h4 className="font-extrabold text-[3rem]">🎬Угадай популярного актера!</h4>
          </div>
          <div className="border-[5px] border-yellow-2 p-[3rem] bg-white rounded-[2rem] absolute mt-[16rem] ml-[20rem] hover:translate-y-[-25%] hover:translate-x-[10%] hover:scale-110">
            <h4 className="font-extrabold text-[3rem]">💬Насколько ты умён?</h4>
          </div>
        </div>   
      </Section>

      <Section styles="bg-dark-1 w-full pt-[15em] max-lg:pt-[15rem] pb-[15rem]">
        <div className="text-center">
          <h1 style={{fontSize: 'clamp(3rem, 11vw, 4.8rem)'}}
          className="text-yellow-1 font-extrabold mb-[3.5rem]">Хочешь создать свой квиз?</h1>
          <p style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}
            className="mb-[4rem] text-light-1 max-w-[550px] mx-auto">
            Если есть идея для квиза, то ты сможешь это реализовать! В Quizero есть возможность пользователям создавать свои квизы на любые темы, а также делится ими!
          </p>
          <div className="bg-white border-yellow-2 border-[5px] rounded-[2rem] p-[3rem] max-w-[460px] mx-auto max-[300px]:p-[1.5rem]">
            <h3 style={{fontSize: 'clamp(1rem, 6vw, 3rem)'}}
              className="text-[3rem] font-semibold mb-[3rem] text-center">Название</h3>
              <div className="mb-[2rem]">
                <Input type="text" name="quiz name" placeholder="Название твоего квиза..."/>
              </div>
              <Link href='/create-quiz'>
                <Button type="yellow">Создать квиз</Button>
              </Link>
          </div>
        </div> 
      </Section>

      <BaseModal title="Модалка" styles="max-w-[500px]">
        <div></div>
      </BaseModal>
    </div>
  );
}
