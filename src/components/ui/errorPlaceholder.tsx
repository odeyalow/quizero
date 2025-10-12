const ErrorPlaceholder = ({ dataName }: { dataName: string }) => {
    return (
        <div className="flex flex-col items-center pt-[10rem] text-center px-[25px] mb-[10rem]">
            <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}
                className="font-extrabold">Упс... произошло ошибка при загрузке {dataName}</h1>
        </div>
    );
}
 
export default ErrorPlaceholder;