import quizzesService from "@/services/quizzesService";
import NewQuizDataType from "@/types/newQuizDataType";
import QuizImageFilesType from "@/types/QuizImageFilesType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateQuiz = (quizData: NewQuizDataType, quizImages: QuizImageFilesType) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => 
            quizzesService.createQuiz(quizData, quizImages),

        onSuccess: () => queryClient.invalidateQueries()
    })
};

export default useCreateQuiz;