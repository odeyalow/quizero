import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import NewQuizDataType from "@/types/newQuizDataType";
import { MainInfoType } from "@/components/forms/mainInfoForm";
import { QuestionType } from "@/types/QuizDataType";

const initialState: NewQuizDataType = {
    ownerId: '',
    isPublic: true,
    slug: '',
    title: '',
    description: '',
    coverImageUrl: '',
    questionsAmount: 0,
    author: '',
    category: 'general',
    tags: [],
    questions: [],
}

const newQuizSlice = createSlice({
    name: 'newQuiz',
    initialState,
    reducers: {
        setOwnerId: (state, action: PayloadAction<string>) => {
            state.ownerId = action.payload;
        },
        setRequiredInfo: (state, action: PayloadAction<MainInfoType>) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setIsPublic: (state, action: PayloadAction<boolean>) => {
            state.isPublic = action.payload;
        },
        setSlug: (state, action: PayloadAction<string>) => {
            state.slug = action.payload;
        },
        setCoverImageUrl: (state, action: PayloadAction<string>) => {
            state.coverImageUrl = action.payload;
        },
        setQuestionsAmount: (state, action: PayloadAction<number>) => {
            state.questionsAmount = action.payload;
        },
        setAuthor: (state, action: PayloadAction<string>) => {
            state.author = action.payload;
        },
        addTag: (state, action: PayloadAction<string>) => {
            if ( !state.tags.includes(action.payload) ) state.tags.push(action.payload);
        },
        removeTag: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter(tag => tag !== action.payload);
        },
        addQuestion: (state, action: PayloadAction<QuestionType>) => {
            state.questions.push(action.payload);
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter(({title}) => title !== action.payload);
        },
    }
})

export const {
    setOwnerId,
    setRequiredInfo,
    setIsPublic,
    setCoverImageUrl,
    setCategory,
    setSlug,
    setQuestionsAmount,
    setAuthor,
    addTag,
    removeTag,
    addQuestion,
    removeQuestion
} = newQuizSlice.actions;
export default newQuizSlice.reducer;