import QuizDataType from "./QuizDataType";

interface UserDataType {
    createdQuizzes: QuizDataType[];
    createdQuizzesAmount: number;
    passedQuizzesAmount: number;
    percentOfCorrectAnswers: number;
};

export default UserDataType;