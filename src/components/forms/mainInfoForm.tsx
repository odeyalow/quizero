'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import Textarea from "@/components/ui/textarea";
import CategoriesSelect from "@/components/ui/categoriesSelect";
import CheckButton from "@/components/ui/сheckButton";
import FormInput from "../ui/formInput";
import Input from "../ui/input";
import Button from "../ui/button";
import Tag from "../ui/tag";
import { useAuthData } from "../layouts/authProvider";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
    setOwnerId,
    setRequiredInfo,
    setIsPublic,
    setCoverImageUrl,
    setCategory,
    setAuthor,
    addTag,
    removeTag,
} from "@/store/slices/newQuizSlice";

import Arrow from "@/assets/arrow";

const mainInfoSchema = z.object({
    title: z.string().min(1, { message: 'Обезательное поле'}),
    description: z.string().min(1, { message: 'Обезательное поле'}),
});

export type MainInfoType = z.infer<typeof mainInfoSchema>;

interface MainInfoProps {
    onCoverImageAdd: (file: File) => void;
    onCoverImageRemove: () => void;
    onNextStep: () => void;
}

const MainInfoForm:React.FC<MainInfoProps> = ({ onCoverImageAdd, onCoverImageRemove, onNextStep}) => {
    const { user } = useAuthData();
    const [coverImage, setCoverImage] = useState<File | null>();
    const [tagInput, setTagInput] = useState<string>('');
    const [tagError, setTagError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const newQuiz = useAppSelector((state) => state.newQuiz);
    const dispatch = useAppDispatch();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<MainInfoType>({
        defaultValues: { title: newQuiz.title || '', description: newQuiz.description || ''},
        resolver: zodResolver(mainInfoSchema)
    });
    
    useEffect(() => {
        if ( user ) {
            dispatch(setOwnerId(user?.uid));
            dispatch(setAuthor(user.displayName!));
        };
    }, [newQuiz.ownerId])
    useEffect(() => {
        if ( !user ) router.replace('/login');
    })
    useEffect(() => {
        if ( coverImage ) {
            const coverImageUrl = URL.createObjectURL(coverImage);
            dispatch(setCoverImageUrl(coverImageUrl));
            onCoverImageAdd(coverImage);
        }
    }, [coverImage])

    const onSubmit = (data: MainInfoType) => {
        dispatch(setRequiredInfo(data));
        onNextStep();
    };

    const handleTagInput = (value: string) => setTagInput(value);
    const onTagAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if ( newQuiz.tags.length === 5 ) {
            setTagError('Можно добавить не более 5 ключевых слов');
        }
        else if ( tagInput === '' ) {
            setTagError('Ключевое слово должно быть не менее 2 символов!');
        }
        else if ( newQuiz.tags.includes(tagInput) ) {
            setTagError('Такое ключевое слово уже добавлено!');
        }
        else {
            dispatch(addTag(tagInput));
            setTagError('');
            setTagInput('');
        }
    };
    const handleTagRemove = (text: string) => {
        dispatch(removeTag(text));
    };
    const handleFileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if ( newQuiz.coverImageUrl ) {
            setCoverImage(null);
            dispatch(setCoverImageUrl(''));
            onCoverImageRemove();
        };
        fileInputRef.current?.click();
    }

    return (
       <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-[3rem] max-lg:flex-col-reverse max-lg:items-center">
            <div className="flex flex-col gap-[2rem] w-full">
                <FormInput
                register={register}
                errors={errors}
                type="text"
                placeholder="Как он будет называться?"
                name="title"
                label="Название"/>
                <Textarea
                register={register}
                errors={errors}
                placeholder="Добавьте дополнительную информацию о вашем квизе..."
                name="description"
                label="Описание"/>
                <CategoriesSelect onSelect={(categoryId) => dispatch(setCategory(categoryId))}/>
                <div>
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Видимость</span>
                    <div className="flex flex-col gap-[1rem]">
                        <CheckButton
                        onChange={() => dispatch(setIsPublic(true))}
                        name="quiz-privacy"
                        type="radio"
                        value="Публичный"
                        checked={newQuiz.isPublic}/> 
                        <CheckButton
                        onChange={() => dispatch(setIsPublic(false))}
                        name="quiz-privacy"
                        type="radio"
                        value="Приватный"
                        checked={!newQuiz.isPublic}/>
                    </div>
                </div>
                <div>
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Ключевые слова</span>
                    <div className="flex gap-[1rem] mb-[1.5rem] max-[500px]:flex-col">
                        <Input
                        type="text"
                        placeholder="Слова связанные с темой квиза..."
                        name="keywords"
                        value={tagInput}
                        onChange={(e) => handleTagInput(e)}/>
                        <Button type="gray" onClick={onTagAdd}>Добавить</Button>
                    </div>
                    { tagError !== '' && <strong className="text-red-1 text-[1.6rem] block my-[1rem]">{tagError}</strong> }
                    {newQuiz.tags.map(tag => {
                        return <Tag key={tag} text={tag} onRemove={() => handleTagRemove(tag)}/>;  
                    })}
                </div>
            </div>
            <div className="w-full max-w-[560px]">
                <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">Обложка</span>
                <div className={`border-[5px] rounded-[1rem] h-[300px] mb-[3rem] relative grid place-items-center group max-sm:h-[250px] ${newQuiz.coverImageUrl ? 'border-light-2' : 'border-gray border-dashed hover:border-blue-1'}`}>
                    <span className="absolute text-[1.6rem] mx-[5rem] text-center text-gray font-bold group-hover:text-blue-1">Загрузите обложку чтобы сделать ваш квиз привлекательнее!</span>
                    {
                        newQuiz.coverImageUrl ? (
                            <Image
                            src={newQuiz.coverImageUrl}
                            fill
                            alt="Quiz Image Preview"
                            className="rounded-[0.5rem]"
                            />
                        ) : (
                            <input
                            type="file"
                            name="quiz-cover"
                            className="opacity-0 cursor-pointer w-full h-full"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setCoverImage(file);
                            }}/>
                        )
                    }
                </div>
                <Button
                type={newQuiz.coverImageUrl ? 'red' : 'blue'}
                onClick={handleFileButton}>
                    {newQuiz.coverImageUrl ? 'Удалить изображение' : 'Загрузить изображение'}
                </Button>
            </div>
        </div>
        
        <div className="flex justify-between mt-[10rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
            <div></div>
            <Button
            type="yellow"
            styles="flex items-center gap-[0.5rem] h-full justify-center">
                Продолжить
                <Arrow styles="max-w-[20px] h-[20px] rotate-180"/>
            </Button>
        </div>
       </form>
    );
}
 
export default MainInfoForm;