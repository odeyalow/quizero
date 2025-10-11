import Button from "./button";

interface IconButtonProps {
    type: 'yellow' | 'dark' | 'gray' | 'green' | 'red' | 'blue';
    onClick?: () => void;
    styles?: string;
    disabled?: boolean;
    children: React.ReactNode;
}

const IconButton:React.FC<IconButtonProps> = ({ type, styles, onClick, disabled, children }) => {
    const disabledStyles = disabled && 'brightness-80 translate-y-[0px] hover:translate-y-[0px]'
    return (
        <Button
            onClick={onClick}
            type={type}
            disabled={disabled}
            styles={`py-[0] pl-[0] pr-[0] h-[45px] min-w-[45px] grid place-items-center
            ${disabledStyles} ${styles}`}>
            {children}
        </Button>
    );
}
 
export default IconButton;