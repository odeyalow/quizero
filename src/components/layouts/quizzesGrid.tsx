import QuizCard from "../ui/quizCard";
import { QuizDataType } from "@/types/QuizDataType";

const QuizzesGrid = ({ quizzes }: { quizzes?: QuizDataType[] }) => {
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
            {
                quizzes && quizzes.map((quiz: QuizDataType) => {
                    return (
                        <QuizCard
                            key={quiz.id}
                            id={quiz.id}
                            slug={quiz.slug}
                            title={quiz.title}
                            imageUrl={quiz.coverImage}
                            author={quiz.author}
                            isConfirmed={quiz.isConfirmed}
                            category={quiz.category}
                            description={quiz.description}
                            questionsAmount={quiz.questionsAmount}
                        />
                    )
                })
            }
        </div>
    );
}
 
export default QuizzesGrid;