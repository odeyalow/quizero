import { QuizDataType } from "./QuizDataType";

type NewQuizDataType = Omit<QuizDataType, 'id' | 'isConfirmed' | 'coverImage'> & { coverImageUrl: string };

export default NewQuizDataType;