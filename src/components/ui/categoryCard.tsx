import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    emoji: string
    id: string
    title: string;
}

const CategoryCard:React.FC<CategoryCardProps> = ({ emoji, id, title }) => {
    const linkHref = {
        pathname: `categories/${id}`,
        query: {
            title: title,
            id: id
        }
    }

    return (
        <Link
        href={linkHref}
        className="relative">
            <div
            className={`
                flex justify-center items-center gap-[1.5rem]
                translate-y-[-5px] cursor-pointer relative z-2
                w-full py-[4rem] max-md:py-[2rem]
                border-[5px] rounded-[20px] border-gray
                text-[3rem] font-extrabold leading-[21px] text-gray
                active:translate-y-0 hover:translate-y-[-10px]
                bg-white
            `}>
                <span>{emoji}</span>
                <h2>{title}</h2>
            </div>
            <div className={`absolute bottom-0 z-[0] rounded-b-[20px] w-full h-[30px] bg-gray`}></div>
        </Link>
    );
}
 
export default CategoryCard;