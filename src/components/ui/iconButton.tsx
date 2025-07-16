import Button from "./button";
import ButtonType from "@/types/buttonType";

interface IconButtonProps {
    type: ButtonType;
    onClick?: () => void;
    styles?: string;
    children: React.ReactNode;
}

const IconButton:React.FC<IconButtonProps> = ({ type, styles, onClick, children }) => {
    return (
        <Button
<<<<<<< HEAD
            onClick={onClick}
            type={type}
            styles={`py-[0] pl-[0] pr-[0] h-[45px] min-w-[45px] grid place-items-center ${styles}`}>
            {children}
=======
        onClick={onClick}
        type={type}
        styles="py-[0] pl-[0] pr-[0] h-[45px] min-w-[45px] grid place-items-center">
           {children}
>>>>>>> modals
        </Button>
    );
}
 
export default IconButton;