import { QuizDataType } from "./QuizDataType";

interface UserDataType {
    createdQuizzes: QuizDataType[];
    createdQuizzesAmount: number;
    passedQuizzes: string[];
    percentOfCorrectAnswers: number;
    correctAnswersAmount: number;
    allAnswersAmount: number;
};

export default UserDataType;