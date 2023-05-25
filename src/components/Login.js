import {useAuth0} from '@auth0/auth0-react';
import styles from '../styles/modules/login.module.scss';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return(
        !isAuthenticated && (
            <button className={styles.loginButton}     onClick={() => loginWithRedirect()} data-testid="login">
                Sign In
            </button>
        )
    )
}

export default LoginButton
