interface InputProps {
    type: string;
    name: string;
    placeholder: string
}

const Input:React.FC<InputProps> = ({ type, name, placeholder }) => {
    return (
        <div className="relative w-full">
            <input
            type={type}
            placeholder={placeholder}
            name={name}
            className="
                translate-y-[-7%]
                w-full py-[8px] px-[15px] relative z-2
                border-[3.5px] border-gray rounded-[10px]
                bg-white
                text-[1.6rem] font-semibold placeholder:text-gray leading-[5px]
                focus:translate-y-0 focus:outline-0"/>
            <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
        </div>
    );
}
 
export default Input;