import QuizCard from "../ui/quizCard";
import { QuizDataType } from "@/types/QuizDataType";

const QuizzesGrid = ({ quizzes }: { quizzes?: QuizDataType[] }) => {
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
            {
                quizzes && quizzes.map((quiz: QuizDataType) => {
                    return (
                        <QuizCard
                            key={quiz.slug}
                            slug={quiz.slug}
                            title={quiz.title}
                            imageUrl={quiz.coverImage}
                            author={quiz.author}
                        />
                    )
                })
            }
        </div>
    );
}
 
export default QuizzesGrid;