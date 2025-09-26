export interface QuizDataType {
    id: string;
    ownerId?: string
    isPublic: boolean;
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    questionsAmount: number;
    author: string;
    isConfirmed: boolean;
    category: string;
    tags: string[];
    questions: QuestionType[]
}

export interface QuestionType {
    id: string;
    title: string;
    image: string;
    options: OptionType[]
}

export interface OptionType {
    text: string;
    isCorrect: boolean;
}