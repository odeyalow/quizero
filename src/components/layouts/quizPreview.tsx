import QuizMainInfoPreview from "./quizMainInfoPreview";
import QuizQuestionsPreview from "./quizQuestionsPreview";
import Button from "../ui/button";

import Arrow from "@/assets/arrow";

interface QuizPreviewProps {
    showQuestions: boolean;
    onPrevStep: () => void;
    onPost?: () => void;
}

const QuizPreview:React.FC<QuizPreviewProps> = ({ showQuestions, onPrevStep, onPost }) => {
    return (
        <div>
            {
                showQuestions ? <QuizQuestionsPreview /> : <QuizMainInfoPreview />
            }
            <div className="flex justify-between mt-[5rem] h-[43.4px] max-[350px]:flex-col-reverse gap-[1.5rem]">
                <Button
                onClick={onPrevStep}
                type="gray"
                styles="flex items-center gap-[0.5rem] h-full justify-center">
                    <Arrow styles="max-w-[20px] h-[20px]"/>
                    Назад
                </Button>
                <Button
                type="yellow"
                styles="flex items-center gap-[0.5rem] h-full justify-center">
                    Опубликовать
                </Button>
            </div>
        </div>
    );
}
 
export default QuizPreview;