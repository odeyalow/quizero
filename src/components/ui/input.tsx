interface InputProps {
    type: string;
    label?: string;
    name: string;
    placeholder: string;
    styles?: string;
}

<<<<<<< HEAD
const Input:React.FC<InputProps> = ({ type, name, label, placeholder }) => {
=======
const Input:React.FC<InputProps> = ({ type, name, placeholder, styles }) => {
>>>>>>> modals
    return (
        <div className="relative w-full">
            {
                label && (
                    <span className="block font-bold mb-[1.5rem] text-left text-[1.8rem]">{label}</span>
                )
            }
            <input
            type={type}
            placeholder={placeholder}
            name={name}
<<<<<<< HEAD
            autoComplete="off"
            className="
                translate-y-[-3px]
                w-full h-[45px] px-[15px] relative z-2
=======
            className={`
                translate-y-[-7%]
                w-full py-[8px] px-[15px] relative z-2
>>>>>>> modals
                border-[3.5px] border-gray rounded-[10px]
                bg-white
                text-[1.6rem] font-semibold placeholder:text-gray leading-[5px]
                focus:translate-y-0 focus:outline-0
                ${styles}
            `}/>
            <div className="absolute bottom-0 z-0 rounded-b-[10px] bg-gray w-full h-[25px] transform-none"></div>
        </div>
    );
}
 
export default Input;