import Button from "./button";

interface IconButtonProps {
    type: 'yellow' | 'dark' | 'gray' | 'green' | 'red' | 'blue';
    onClick?: () => void;
    styles?: string;
    children: React.ReactNode;
}

const IconButton:React.FC<IconButtonProps> = ({ type, styles, onClick, children }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            styles={`py-[0] pl-[0] pr-[0] h-[45px] min-w-[45px] grid place-items-center ${styles}`}>
            {children}
        </Button>
    );
}
 
export default IconButton;