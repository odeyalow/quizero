import Button from "./button";
import Cross from "@/assets/cross";

const MenuCloseButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
        onClick={onClick}
        type="yellow"
        styles="lg:hidden flex items-center justify-between">
            Закрыть
            <Cross styles="text-yellow-2 w-10 h-10"/>
        </Button>
    );
}
 
export default MenuCloseButton;