import { QuizDataType } from "./QuizDataType";
import { QuestionType } from "./QuizDataType";
 
type NewQuizDataType = Omit<QuizDataType, 'id' | 'coverImage'> & { coverImageUrl: string };

export default NewQuizDataType;