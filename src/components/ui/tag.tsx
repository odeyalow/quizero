import { useState } from "react";

interface TagProps {
    text: string;
    onRemove: () => void; 
}

const Tag:React.FC<TagProps> = ({ text, onRemove }) => {
    const [showButton, setShowButton] = useState<boolean>(false);
    return (
        <div className="pr-[1rem] inline font-bold text-yellow-1 text-[1.6rem]">
            {
                !showButton && (
                    <span 
                    onMouseEnter={() => setShowButton(true)}>{text}.</span>
                )
            }
            {
                showButton && (
                    <button
                    onMouseLeave={() => setShowButton(false)}
                    className="text-red-1 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove()
                    }}>Удалить</button>
                )
            }
        </div>
    );
}
 
export default Tag;