import styles from '../Login/Login.module.css';
import Headling from "../../Headling/Headling";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {Link, useNavigate} from 'react-router-dom';
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {login, register, userActions} from "../../store/user.slice";


export type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
}

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);


    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const sumbit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const {email, password, name} = target;
        dispatch(register({email: email.value, password: password.value, name: name.value}));
    }


    return <div className={styles['login']}>
        <Headling>Регистрация</Headling>
        {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
        <form className={styles['form']} onSubmit={sumbit}>
            <div className={styles['field']}>
                <label htmlFor='email'>Ваш email</label>
                <Input name="email" id='email' placeholder='Email' isValid={true}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='password'>Ваш пароль </label>
                <Input name="password" id='password' type='password' placeholder='Пароль' isValid={true}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor='name'>Ваше имя </label>
                <Input name="name" id='name' placeholder='Имя' isValid={true}/>
            </div>
            <Button appearance='big'>Зарегистрироваться</Button>
        </form>
        <div className={styles['links']}>
            <div> Есть аккаунт?</div>
            <Link to='/auth/login'>Войти</Link>
        </div>
    </div>
}

export default Register;