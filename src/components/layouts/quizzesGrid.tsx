import QuizCard from "../ui/quizCard";

const QuizzesGrid = () => {
    return (
        <div className="min-[400px]:grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] max-sm:flex max-sm:flex-col gap-[3rem]">
            <QuizCard
                slug="/quiz"
                title="Название Квиза"
                imageUrl="/images/placeholder.png"
                author="Aвтор"
            />
            <QuizCard
                slug="/quiz"
                title="Название Квиза"
                author="Aвтор"
            />
            <QuizCard
                slug="/quiz"
                title="Название Квиза"
                author="Aвтор"
            />
        </div>
    );
}
 
export default QuizzesGrid;