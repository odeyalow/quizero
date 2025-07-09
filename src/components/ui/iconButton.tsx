import Button from "./button";
import ButtonType from "@/types/buttonType";

interface IconButtonProps {
    type: ButtonType;
    onClick?: () => void;
    children: React.ReactNode;
    styles?: string;
}

const IconButton:React.FC<IconButtonProps> = ({ type, onClick, children }) => {
    return (
        <Button
        onClick={onClick}
        type={type}
        styles="py-[0] pl-[0] pr-[0] h-[41px] min-w-[45px] grid place-items-center">
           {children}
        </Button>
    );
}
 
export default IconButton;