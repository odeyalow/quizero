import SectionWithHeader from "@/components/layouts/sectionWithHeader";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";
import CheckButton from "@/components/ui/сheckButton";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/iconButton";

import Arrow from "@/assets/arrow";
import Cross from "@/assets/cross";

export default function CreateQuiz() {
    return (
        <SectionWithHeader bigTitle="Создание квиза">
            <div>
                {/* Main information */}
                <h2 className="text-[3rem] font-extrabold mb-[3rem]">Заголовок этапа</h2>
                {/* <div className="flex gap-[3rem]">
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
                            <div className="flex gap-[1rem] mb-[1.5rem]">
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
                        <div className="border-[5px] border-gray border-dashed rounded-[1rem] h-[300px] mb-[3rem] relative grid place-items-center group hover:border-blue-1">
                            <span className="absolute text-[1.6rem] mx-[5rem] text-center text-gray font-bold group-hover:text-blue-1">Загрузите обложку чтобы сделать ваш квиз привлекательнее!</span>
                            <input type="file" name="quiz-cover" className="opacity-0 cursor-pointer w-full h-full" />
                        </div>
                        <Button type="blue">Загрузить изображение</Button>
                    </div>
                </div> */}
                {/* Main information */}

                {/* Questions */}
                {/* <div className="flex flex-col gap-[3rem]">
                    <div className="flex gap-[1.5rem]">
                        <div className="flex gap-[1rem]">
                            <Button type="gray" styles="text-[2rem]">1</Button>
                            <Button type="blue" active styles="text-[2rem]">2</Button>
                            <Button type="gray" styles="text-[2rem]">3</Button>
                        </div>
                        <div className="flex gap-[1rem]">
                            <Button type="blue" styles="text-[2rem]">Добавить</Button>
                            <Button type="red" styles="text-[2rem]">Удалить</Button>
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Картинка</span>
                        <div className="border-[5px] border-gray border-dashed rounded-[1rem] h-[450px] mb-[3rem] relative grid place-items-center group hover:border-blue-1">
                            <span className="absolute text-[2rem] mx-[10rem] text-center text-gray font-bold group-hover:text-blue-1">
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
                <div>
                    
                </div>
                {/* Preview */}

                <div className="flex justify-between mt-[3rem] h-[43.4px]">
                    <Button type="yellow" styles="flex items-center gap-[0.5rem] h-full">
                        <Arrow styles="max-w-[20px] h-[20px]"/>
                        Назад
                    </Button>
                    <Button type="yellow" styles="flex items-center gap-[0.5rem] h-full">
                        Продолжить
                        <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
                    </Button>
                </div>
            </div>
        </SectionWithHeader>
    )
}