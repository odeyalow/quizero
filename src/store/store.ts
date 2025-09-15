import { configureStore } from "@reduxjs/toolkit";
import newQuizSlice from './slices/newQuizSlice';

export const store = configureStore({
    reducer: {
        newQuiz: newQuizSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;