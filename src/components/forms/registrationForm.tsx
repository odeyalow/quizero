import Input from "../ui/input";
import Button from "../ui/button";

const RegistrationForm = () => {
    return (
       <form className="flex flex-col gap-[2rem]">
        <Input type="text" name="username" placeholder="Введите имя пользователя" label="Имя пользователя" />
        <Input type="email" name="email" placeholder="Введите эл. почту" label="Эл. почта" />
        <Input type="password" name="password" placeholder="Введите ваш пароль" label="Пароль"/>
        <Input type="password" name="сonfirm-password" placeholder="Введите пароль повторно" label="Подтверждение пароля"/>
        <Button type="yellow">Зарегистрироваться</Button>
       </form>
    );
}
 
export default RegistrationForm;