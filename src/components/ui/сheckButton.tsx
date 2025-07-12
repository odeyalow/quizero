interface CheckButtonProps {
    type: 'checkbox' | 'radio';
    checked?: boolean;
    value: string;
    name: string;
}

const CheckButton:React.FC<CheckButtonProps> = ({ type, name, value, checked }) => {
    const roundedStyles = type === 'checkbox' ? 'rounded-[0.5rem]' : 'rounded-full';
    return (
        <div className="flex gap-[1rem] items-center">
            <input
            className={`
                bg-white appearance-none w-[2.5rem] h-[2.5rem] border-[3.5px] border-gray checked:border-yellow-1 checked:bg-yellow-1
                ${roundedStyles}
            `}
            type={type}
            name={name}
            checked={checked}
            />
            <span className="block font-bold text-left text-[1.8rem]">{value}</span>
        </div>
    );
}
 
export default CheckButton;