import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import NewQuizDataType from "@/types/newQuizDataType";
import { MainInfoType } from "@/components/forms/mainInfoForm";
import { OptionType, QuestionType } from "@/types/QuizDataType";

const initialState: NewQuizDataType = {
    ownerId: '',
    isPublic: true,
    slug: '',
    title: 'a',
    description: 'a',
    coverImageUrl: '',
    questionsAmount: 0,
    author: '',
    category: 'general',
    tags: [],
    questions: [
        {
            title: '',
            imageUrl: '',
            options: []
        },
        // {
        //     title: '',
        //     image: 'https://cdn.pixabay.com/photo/2025/07/10/18/57/snowfield-9707323_1280.jpg',
        //     options: []
        // },
        // {
        //     title: '',
        //     image: 'https://cdn.pixabay.com/photo/2025/08/25/20/04/nature-9796816_1280.jpg',
        //     options: []
        // }
    ],
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
        addQuestion: (state) => {
            state.questions.push({
                title: '',
                imageUrl: '',
                options: []
            });
        },
        setQuestionTitle: (state, action: PayloadAction<{ questionId: number, title: string }>) => {
            state.questions[action.payload.questionId].title = action.payload.title;
        },
        setQuestionImage: (state, action: PayloadAction<{ questionId: number, imageUrl: string }>) => {
            state.questions[action.payload.questionId].imageUrl = action.payload.imageUrl;
        },
        addOption: (state, action: PayloadAction<number>) => {
            if ( state.questions[action.payload].options.length === 0 ) {
                state.questions[action.payload].options.push({
                    text: '',
                    isCorrect: true,
                })
            } else {
                state.questions[action.payload].options.push({
                    text: '',
                    isCorrect: false,
                })
            }
        },
        removeOption: (state, action: PayloadAction<{ questionId: number, optionId: number }>) => {
            const optionId = action.payload.optionId;
            let options = state.questions[action.payload.questionId].options;

            if ( options.length > 1 && options[optionId].isCorrect && optionId === 0 ) {
                options[optionId+1].isCorrect = true;
            } else if ( options.length > 1 && options[optionId].isCorrect ) {
                options[optionId-1].isCorrect = true;
            } else {
                state.questions[action.payload.questionId].options = options
                .filter((_, index) => index !== optionId );
            }
            state.questions[action.payload.questionId].options = options
            .filter((_, index) => index !== optionId );
        },
        setOptionText: (state, action: PayloadAction<{ questionId: number, optionId: number, text: string }>) => {
            state.questions[action.payload.questionId].options[action.payload.optionId].text = action.payload.text;
        },
        setOptionCorrect: (state, action: PayloadAction<{ questionId: number, optionId: number }>) => {
            state.questions[action.payload.questionId].options = state.questions[action.payload.questionId].options
            .map((option: OptionType) => ({...option, isCorrect: false}));
            state.questions[action.payload.questionId].options[action.payload.optionId].isCorrect = true;
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter((_, index) => index+1 !== action.payload);
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
    setQuestionTitle,
    setQuestionImage,
    addOption,
    removeOption,
    setOptionText,
    setOptionCorrect,
    removeQuestion
} = newQuizSlice.actions;
export default newQuizSlice.reducer;