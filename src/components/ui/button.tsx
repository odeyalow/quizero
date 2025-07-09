import ButtonType from "@/types/buttonType";

interface ButtonProps {
    type: ButtonType;
    onClick?: () => void;
    children: React.ReactNode;
    styles?: string;
}

const Button:React.FC<ButtonProps> = ({ type, onClick, children, styles }) => {
    const buttonStyles = {
        yellow: { bg: 'bg-yellow-1', text: 'text-yellow-2', border: 'border-yellow-2', decorBg: 'bg-yellow-2' },
        dark: { bg: 'bg-dark-1', text: 'text-yellow-1', border: 'border-dark-2', decorBg: 'bg-dark-2' },
        gray: { bg: 'bg-white', text: 'text-gray', border: 'border-gray', decorBg: 'bg-gray' },
        green: { bg: 'bg-green-1', text: 'text-green-2', border: 'border-green-2', decorBg: 'bg-green-2' },
        red: { bg: 'bg-red-1', text: 'text-red-2', border: 'border-red-2', decorBg: 'bg-red-2' },
        blue: { bg: 'bg-blue-1', text: 'text-blue-2', border: 'border-blue-2', decorBg: 'bg-blue-2' },
    }
    
    return (
        <div className="relative">
            <button
            onClick={onClick}
            className={`
                translate-y-[-3px] cursor-pointer relative z-2
                w-full py-[.8rem] px-[1.5rem]
                border-[3.5px] rounded-[10px] ${buttonStyles[type].border}
                ${buttonStyles[type].text} text-[1.6rem] font-semibold leading-[21px]
                ${buttonStyles[type].bg}
                active:translate-y-0 hover:translate-y-[-5px]
                ${styles}
            `}>
                {children}
            </button>
            <div className={`absolute bottom-0 z-[0] rounded-b-[10px] w-full h-[25px] ${buttonStyles[type].decorBg}`}></div>
        </div>
    );
}
 
export default Button;