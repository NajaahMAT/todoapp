import {useAuth0} from '@auth0/auth0-react';
import styles from '../styles/modules/logout.module.scss';
import { Cookies } from 'react-cookie';

const LogoutButton = () => {
    const { logout, isAuthenticated} = useAuth0();

    // Method to get data from cookies
    const GetCookie = () => {
        alert(Cookies.get("access_token"));
    };

    console.log(GetCookie())

    return(
        isAuthenticated && (
            <button className={styles.logoutButton} onClick={() => logout()}  data-testid="logoutComp">
                Sign Out
            </button>
        )
    )
}

export default LogoutButton
