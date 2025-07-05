import Button from "./button";

const MenuOpenButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
        onClick={onClick}
        type="gray"
        styles="hidden flex-col justify-between px-[1rem] h-[43px] max-lg:flex">
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
            <div className="bg-gray min-h-[5px] w-[2rem] rounded"></div>
        </Button>
    );
}
 
export default MenuOpenButton;