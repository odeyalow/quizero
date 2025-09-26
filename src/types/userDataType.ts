import { QuizDataType } from "./QuizDataType";

interface UserDataType {
    createdQuizzes: QuizDataType[];
    passedQuizzes: [];
    createdQuizzesAmount: number;
    percentOfCorrectAnswers: number;
    correctAnswersAmount: number;
    allAnswersAmount: number;
};

export default UserDataType;