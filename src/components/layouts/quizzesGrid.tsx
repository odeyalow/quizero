import QuizCard from "../ui/quizCard";
import { QuizDataType } from "@/types/QuizDataType";
import Spinner from "../ui/spinner";

const QuizzesGrid = ({ quizzes, isPending }: { quizzes: QuizDataType[], isPending?: boolean }) => {
    
    if ( isPending ) { return <Spinner />}
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem] items-stretch">
            {
                quizzes && quizzes.map((quiz: QuizDataType) => {
                    return (
                        <QuizCard
                            key={quiz.id}
                            id={quiz.id}
                            slug={quiz.slug}
                            title={quiz.title}
                            imageUrl={quiz.coverImageUrl}
                            author={quiz.author}
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