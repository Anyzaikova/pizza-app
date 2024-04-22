import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import Headling from "../../Headling/Headling";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {FormEvent, useState} from "react";
import {PREFIX} from "../../helpers/API";
import axios, {AxiosError} from "axios";
import {LoginResponse} from "../../Interfaces/auth.interface";


export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

function Login() {
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const sumbit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;
        sendLogin(email.value, password.value);
    }

    const sendLogin = async (email: string, password: string) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email,
                password
            })
            console.log(data);
            localStorage.setItem('jwt', data.access_token);
            navigate('/');
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data.message)
                console.error(e);
            }

        }

    }
    return <div className={styles['login']}>
        <Headling>Вход</Headling>
        {error && <div className={styles['error']}>{error}</div>}
        <form className={styles['form']} onSubmit={sumbit}>
            <div className={styles['field']}>
                <label htmlFor='email'>Ваш email</label>
                <Input name="email" id='email' placeholder='Email'/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='password'>Ваш пароль </label>
                <Input name="password" id='password' type='password' placeholder='Пароль'/>
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