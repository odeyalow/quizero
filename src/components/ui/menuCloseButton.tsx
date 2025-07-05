import Button from "./button";

const MenuCloseButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
        onClick={onClick}
        type="yellow"
        styles="hidden flex-col justify-between px-[1rem] h-[43px] max-lg:flex">
            Закрыть
        </Button>
    );
}
 
export default MenuCloseButton;