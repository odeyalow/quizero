export interface QuizDataType {
    isPublic: boolean;
    slug: string;
    title: string;
    description: string;
    coverImage?: string;
    questionsAmount: number;
    author: string;
    category: string;
    tags: string[];
    questionsa: QuestionType[]
}

export interface QuestionType {
    title: string;
    image?: string;
    options: OptionType[]
}

export interface OptionType {
    text: string;
    isCorrect: boolean;
}