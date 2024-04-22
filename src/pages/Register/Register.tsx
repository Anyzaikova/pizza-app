import styles from './Register.module.css';
import {Outlet} from 'react-router-dom';

function Register() {
    return <div className={styles['layout']}>
        <div className={styles['logo']}>

        </div>
        <div className={styles['content']}>
            <Outlet/>
        </div>
    </div>
}

export default Register;