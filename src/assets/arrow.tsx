const Arrow = ({ styles }: { styles?: string}) => {
    return (
        <svg
        className={`w-[30px] h-[30px] ${styles}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
            <path
                d="M5 12H19M5 12L11 6M5 12L11 18"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </g>
        </svg>
    );
}
 
export default Arrow;