import {useAuth0} from '@auth0/auth0-react';
import styles from '../styles/modules/logout.module.scss';

const LogoutButton = () => {
    const { logout, isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <button className={styles.logoutButton} onClick={() => logout()}  data-testid="logoutComp">
                Sign Out
            </button>
        )
    )
}

export default LogoutButton
