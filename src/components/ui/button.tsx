import ButtonType from "@/types/ButtonType";

interface ButtonProps {
    type: ButtonType;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    styles?: string;
}

const Button:React.FC<ButtonProps> = ({ type, onClick, active, disabled, children, styles }) => {
    const buttonStyles = {
        yellow: { bg: 'bg-yellow-1', text: 'text-yellow-2', border: 'border-yellow-2', decorBg: 'bg-yellow-2' },
        dark: { bg: 'bg-dark-1', text: 'text-yellow-1', border: 'border-dark-2', decorBg: 'bg-dark-2' },
        gray: { bg: 'bg-white', text: 'text-gray', border: 'border-gray', decorBg: 'bg-gray' },
        green: { bg: 'bg-green-1', text: 'text-green-2', border: 'border-green-2', decorBg: 'bg-green-2' },
        red: { bg: 'bg-red-1', text: 'text-red-2', border: 'border-red-2', decorBg: 'bg-red-2' },
        blue: { bg: 'bg-blue-1', text: 'text-blue-2', border: 'border-blue-2', decorBg: 'bg-blue-2' },
    }
    
    const activeStyles = !active && 'translate-y-[-3px] hover:translate-y-[-5px] active:translate-y-0'
    const disabledStyles = disabled && 'brightness-80 translate-y-[0px] hover:translate-y-[0px]'

    return (
        <div className="relative">
            <button
            disabled={disabled}
            onClick={onClick}
            className={`
                cursor-pointer relative z-2
                w-full h-[45px] px-[1.5rem]
                border-[3.5px] rounded-[10px] ${buttonStyles[type].border}
                ${buttonStyles[type].text} text-[1.6rem] font-extrabold leading-[21px]
                ${buttonStyles[type].bg}
                ${activeStyles} ${styles}
                ${disabledStyles}
            `}>
                {children}
            </button>
            <div className={`absolute bottom-0 z-[0] rounded-b-[10px] w-full h-[25px] ${buttonStyles[type].decorBg}`}></div>
        </div>
    );
}
 
export default Button;