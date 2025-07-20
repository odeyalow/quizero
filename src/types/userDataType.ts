export interface UserDataType {
    createdAt: string;
    createdQuizzes: QuizDataType[];
    createdQuizzesAmount: number;
    passedQuizzesAmount: number;
    percentOfCorrectAnswers: number;
};

export interface QuizDataType {
    title: string;
}