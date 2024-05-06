import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {login, userActions} from "../../store/user.slice";


export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);


    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const sumbit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;
        sendLogin(email.value, password.value);
    }

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({email, password}));

    }


    return <div className={styles['login']}>
        <Headling>Вход</Headling>
        {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
        <form className={styles['form']} onSubmit={sumbit}>
            <div className={styles['field']}>
                <label htmlFor='email'>Ваш email</label>
                <Input name="email" id='email' placeholder='Email' isValid={true}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='password'>Ваш пароль </label>
                <Input name="password" id='password' type='password' placeholder='Пароль' isValid={true}/>
            </div>
            <Button appearance='big'>Вход</Button>
        </form>
        <div className={styles['links']}>
            <div> Нет аккаунта?</div>
            <Link to='/auth/register'>Зарегистрироваться</Link>
        </div>
    </div>

}

export default Login;