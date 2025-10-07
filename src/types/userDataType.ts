import { QuizDataType } from "./QuizDataType";

interface UserDataType {
    role: string;
    username: string,
    createdQuizzes: string[];
    passedQuizzes: string[];
    percentOfCorrectAnswers: number;
    correctAnswersAmount: number;
    allAnswersAmount: number;
    photoURL?: string;
};

export default UserDataType;