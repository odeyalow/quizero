import Button from "./button";
import IconButton from "./iconButton";
const MenuOpenButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <IconButton
        onClick={onClick}
        type="gray"
        styles="hidden flex-col justify-between py-[8px] max-lg:flex">
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
        </IconButton>
    );
}
 
export default MenuOpenButton;