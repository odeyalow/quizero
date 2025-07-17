import Input from "../ui/input";
import Button from "../ui/button";

const LoginForm = () => {
    return (
       <form className="flex flex-col gap-[2rem]">
        <Input type="text" name="username-or-email" placeholder="Введите эл. почту или имя пользователя" label="Эл. почта или имя пользователя" />
        <Input type="password" name="password" placeholder="Введите ваш пароль" label="Пароль"/>
        <Button type="yellow">Войти</Button>
       </form>
    );
}
 
export default LoginForm;