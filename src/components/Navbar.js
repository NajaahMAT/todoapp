import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import LoginButton from './Login';
// import LogoutButton from './Logout';
import styles from '../styles/modules/nav.module.scss';
import LoginButton from './Login';
import LogoutButton from './Logout';

function Navbar() {
    const { error } = useAuth0();

    return (
        <header data-testid="Navbar">
            <nav>
                <div className={styles.login}>
                    {!error && (
                        <>
                            <LoginButton/>
                            <LogoutButton/>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
