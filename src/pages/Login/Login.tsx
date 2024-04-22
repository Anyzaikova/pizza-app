import styles from './Login.module.css';
import {Outlet} from 'react-router-dom';

function Login() {
    return <div className={styles['layout']}>
        <div className={styles['logo']}>

        </div>
        <div className={styles['content']}>
            <Outlet/>
        </div>
    </div>
}

export default Login;