import styles from './AuthLayout.module.css';
import {Outlet} from 'react-router-dom';

function AuthLayout() {
    return <div className={styles['layout']}>
        <div className={styles['logo']}>

        </div>
        <div className={styles['content']}>
            <Outlet/>
        </div>
    </div>
}

export default AuthLayout;