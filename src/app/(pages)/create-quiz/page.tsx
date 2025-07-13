import Image from "next/image";

import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";
import CheckButton from "@/components/ui/сheckButton";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Arrow from "@/assets/arrow";
import Cross from "@/assets/cross";
import Triangle from "@/assets/triangle";
import Share from "@/assets/share";

export default function CreateQuiz() {
    return (
        <SectionWithHeader bigTitle="Создание квиза">
            <div>
                <div className="mb-[3rem] max-sm:text-center">
                    <h2 style={{fontSize: 'clamp(2rem, 7vw, 3rem)'}}
                        className="text-[3rem] font-extrabold mb-[1rem]">Заголовок этапа</h2>
                    {/* <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                        className="text-[2rem]">
                        Так будет выглядеть страница вашего квиза после публикации!
                    </p> */}
                </div>

                {/* Main information */}
                <div className="flex gap-[3rem] max-lg:flex-col-reverse max-lg:items-center">
                    <div className="flex flex-col gap-[2rem] w-full">
                        <Input type="text" placeholder="Как он будет называться?" name="quiz-name" label="Название"/>
                        <Textarea placeholder="Добавьте дополнительную информацию о вашем квизе..." name="quiz-description" label="Описание"/>
                        <Select label="Категория" options={['Общее', 'Кино', 'Животные', 'Космос']}/>
                        <div>
                            <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Видимость</span>
                            <div className="flex flex-col gap-[1rem]">
                                WHEN START DEVELOPING CHECKBUTTON FUNCTIONALITY ADD CHECKED TO FIRST CHECKBUTTON
                                <CheckButton name="quiz-privacy" type="radio" value="Публичный"/> 
                                <CheckButton name="quiz-privacy" type="radio" value="Приватный"/>
                            </div>
                        </div>
                        <div>
                            <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Ключевые слова</span>
                            <div className="flex gap-[1rem] mb-[1.5rem] max-[500px]:flex-col">
                                <Input type="text" placeholder="Слова связанные с темой квиза..." name="quiz-keywords"/>
                                <Button type="gray">Добавить</Button>
                            </div>
                            <p className="font-bold text-yellow-1 text-[1.6rem]">
                                Животные, Природа, Зоология
                            </p>
                        </div>
                    </div>
                    <div className="w-full max-w-[560px]">
                        <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Обложка</span>
                        <div className="border-[5px] border-gray border-dashed rounded-[1rem] h-[300px] mb-[3rem] relative grid place-items-center group hover:border-blue-1 max-sm:h-[250px]">
                            <span className="absolute text-[1.6rem] mx-[5rem] text-center text-gray font-bold group-hover:text-blue-1">Загрузите обложку чтобы сделать ваш квиз привлекательнее!</span>
                            <input type="file" name="quiz-cover" className="opacity-0 cursor-pointer w-full h-full" />
                        </div>
                        <Button type="blue">Загрузить изображение</Button>
                    </div>
                </div>
                {/* Main information */}

                {/* Questions */}
                {/* <div className="flex flex-col gap-[3rem]">
                    <div className="flex gap-[1.5rem] flex-wrap max-sm:justify-center">
                        <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                            <Button type="gray" styles="text-[2rem]">1</Button>
                            <Button type="blue" active styles="text-[2rem]">2</Button>
                            <Button type="gray" styles="text-[2rem]">3</Button>
                        </div>
                        <div className="flex gap-[1rem] flex-wrap max-sm:justify-center">
                            <Button type="blue" styles="text-[2rem]">Добавить</Button>
                            <Button type="red" styles="text-[2rem]">Удалить</Button>
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Картинка</span>
                        <div className="border-[5px] border-gray border-dashed rounded-[1rem] h-[450px] mb-[3rem] relative grid place-items-center group hover:border-blue-1 max-sm:h-[250px]">
                            <span style={{fontSize: 'clamp(1.5rem, 3vw, 2rem)'}}
                                className="absolute text-[2rem] mx-[10rem] text-center text-gray font-bold group-hover:text-blue-1 max-sm:mx-[5rem]">
                                Загрузите картинку которая будет показываться на этом вопросе. *Если картинка не загружена то вопрос будет без нее.
                            </span>
                            <input type="file" name="quiz-cover" className="opacity-0 cursor-pointer w-full h-full" />
                        </div>
                        <Button type="blue">Загрузить изображение</Button>
                    </div>
                    <Input type="text" placeholder="Как он будет называться?" name="quiz-name" label="Текст вопроса"/>
                    <div className="flex flex-col gap-[1.5rem]">
                        <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Варианты ответов</span>
                        <div className="flex gap-[1rem]">
                            <CheckButton type="radio" name="quiz-question"/>
                            <Input type="text" placeholder="Текст ответа" name="quiz-name"/>
                            <IconButton type="gray">
                                <Cross styles="w-[25px]"/>
                            </IconButton>
                        </div>
                        <div className="flex gap-[1rem]">
                            <CheckButton type="radio" name="quiz-question"/>
                            <Input type="text" placeholder="Текст ответа" name="quiz-name"/>
                            <IconButton type="gray">
                                <Cross styles="w-[25px]"/>
                            </IconButton>
                        </div>
                        <div className="flex gap-[1rem]">
                            <CheckButton type="radio" name="quiz-question"/>
                            <Input type="text" placeholder="Текст ответа" name="quiz-name"/>
                            <IconButton type="gray">
                                <Cross styles="w-[25px]"/>
                            </IconButton>
                        </div>
                    </div>
                    <Button type="blue">Добавить ответ</Button>
                </div> */}
                {/* Questions */}

                {/* Preview */}
                {/* <div>
                    <h2 style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)'}}
                    className="font-extrabold mb-[3rem]">Названия квиза</h2>
                    <div className="flex gap-[3rem] max-[1100px]:flex-col">
                            <div className="max-w-[670px] max-[1100px]:max-w-full max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center">
                                <Image
                                src='/images/placeholder.png'
                                width={670}
                                height={380}
                                alt="Quiz Cover"
                                className="max-w-[100%] h-[380px] object-cover rounded-[1rem] border-light-2 border-[5px] mb-[3rem] max-sm:h-[300px]"
                                />
                            <div>
                                <h3 className="text-[2.4rem] font-extrabold mb-[1.5rem]">Описание</h3>
                                <p style={{fontSize: 'clamp(1rem, 5vw, 2rem)'}}
                                    className="text-[2rem] font-normal">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget sollicitudin nunc, elementum vehicula odio. Cras mi turpis, volutpat in faucibus in, auctor vitae massa. Maecenas ac placerat lorem. Donec et orci at elit auctor tristique. Integer aliquet, turpis a tempor ultrices, mauris sem pellentesque purus, non blandit enim eros eget eros. Mauris ac turpis rhoncus arcu pharetra iaculis.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white border-[5px] border-gray p-[3rem] rounded-[1rem] w-full h-min max-[1100px]:max-w-[600px] max-[1100px]:mx-auto">
                            <div className="flex flex-col gap-[2.5rem] mb-[3rem]">
                                <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                                className="text-[2.4rem] font-bold">💬 Категория</h4>
                                <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                                className="text-[2.4rem] font-bold">👤 от Автора</h4>
                                <h4 style={{fontSize: 'clamp(1.5rem, 5vw, 2.4rem)'}} 
                                className="text-[2.4rem] font-bold">❓ Вопросы: 15</h4>
                                <p className="text-gray text-[1.6rem]">Животные, Природа, Зоология</p>
                            </div>
                            <div className="flex gap-[1rem] max-sm:flex-col">
                                <div className="w-full">
                                    <Button type="yellow" styles="flex justify-center items-center gap-[0.5rem]">
                                    Начать
                                    <Triangle />
                                </Button>
                            </div>
                                <IconButton type="blue">
                                    <Share />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* Preview */}

                <div className="flex justify-between mt-[10rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
                    <Button type="yellow" styles="flex items-center gap-[0.5rem] h-full justify-center">
                        <Arrow styles="max-w-[20px] h-[20px]"/>
                        Назад
                    </Button>
                    <Button type="yellow" styles="flex items-center gap-[0.5rem] h-full justify-center">
                        Продолжить
                        <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                    </Button>
                </div>
            </div>
        </SectionWithHeader>
    )
}