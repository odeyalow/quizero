import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
    imageUrl: string
    imageAlt: string;
    slug: string
    title: string;
}

const CategoryCard:React.FC<CategoryCardProps> = ({ imageUrl, imageAlt, slug, title }) => {
    const linkHref = {
        href: slug,
    }

    return (
        <Link
        href={slug}
        className="relative">
            <div
            className={`
                flex justify-center items-center gap-[1.5rem]
                translate-y-[-3%] cursor-pointer relative z-2
                w-full py-[4rem] max-md:py-[2rem]
                border-[5px] rounded-[20px] border-gray
                text-[3rem] font-extrabold leading-[21px] text-gray
                active:translate-y-0 hover:translate-y-[-5%]
                bg-white
            `}>
                <Image
                className="max-sm:w-[40px] max-[300px]:hidden"
                src={imageUrl}
                width={65}
                height={65}
                alt={imageAlt}
                ></Image>
                <h2>{title}</h2>
            </div>
            <div className={`absolute bottom-0 z-[0] rounded-b-[20px] w-full h-[25px] bg-gray`}></div>
        </Link>
    );
}
 
export default CategoryCard;