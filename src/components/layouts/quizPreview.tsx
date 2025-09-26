import QuizMainInfoPreview from "./quizMainInfoPreview";
import QuizQuestionsPreview from "./quizQuestionsPreview";
import Button from "../ui/button";
import useModal from "@/hooks/useModal";
import BaseModal from "../ui/baseModal";

import Arrow from "@/assets/arrow";

interface QuizPreviewProps {
    showQuestions: boolean;
    onPrevStep: () => void;
    onQuizPost: () => void;
}

const QuizPreview:React.FC<QuizPreviewProps> = ({ showQuestions, onPrevStep, onQuizPost }) => {
    const { openModal, closeModal, showModal } = useModal();

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
                onClick={openModal}
                type="yellow"
                styles="flex items-center gap-[0.5rem] h-full justify-center">
                    Опубликовать
                </Button>
            </div>
            <BaseModal
            title="Готовы поделиться своим квизом?"
            description="Почти всё готово! После публикации другие пользователи смогут пройти ваш квиз (если выбран публичный доступ). Проверьте ещё раз всё ли верно? Если да — смело нажимайте на кнопку! 🚀"
            buttonText="Опубликовать"
            modalActive={showModal}
            type="confirm"
            onConfirm={onQuizPost}
            onClose={closeModal}/>
        </div>
    );
}
 
export default QuizPreview;