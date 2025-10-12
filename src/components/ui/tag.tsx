import Trash from "@/assets/trash";

interface TagProps {
    text: string;
    onRemove: () => void; 
}

const Tag:React.FC<TagProps> = ({ text, onRemove }) => {
    return (
        <div className="p-[1rem] font-bold text-gray text-[1.6rem] flex items-center gap-[1rem] bg-white border-gray border-[3.5px] rounded-[1rem]">
            {text}
            <button onClick={onRemove}>
                <Trash />
            </button>
        </div>
    );
}
 
export default Tag;