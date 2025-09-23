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
    title: string;
    imageUrl: string;
    options: OptionType[]
}

export interface OptionType {
    text: string;
    isCorrect: boolean;
}