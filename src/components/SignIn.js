import React, {useState} from 'react';
import styles from '../styles/modules/signin.module.scss';
import {Navigate} from 'react-router-dom';
import Button from './Button';
import { Cookies } from 'react-cookie';

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);

    const cookies = new Cookies();

    const submit = async (e) => {
        e.preventDefault();
        console.log({
            email,
            password
        })


        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        const response = await fetch('http://localhost:8080/login',{
            method: 'POST',
            // headers:headers,
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            // credentials: 'include',
            // mode: 'no-cors',
            // credentials: 'include',
            body: new URLSearchParams({
                'email': email,
                'password': password
            })
        })

        const content = await response.json()
        console.log(content)

        const token = content.accessToken;
        const userID = content.userID;

        cookies.set('token', token);
        cookies.set('user_id', userID);
        cookies.set('is_loggedin', true);

        setRedirect(true)
    }

    if (redirect){
        return <Navigate to="/tasks"/>
    }

    return(
        <form onSubmit={submit} className={styles.formSignin} >

            <h1 className={styles.formTitle}>Please sign in</h1>

            <input
                type="email"
                className={styles.formControl}
                placeholder="Email address"
                required
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                className={styles.formControl}
                placeholder="Password"
                required
                onChange={e => setPassword(e.target.value)}
            />

            <div className={styles.buttonContainer}>
             <Button type="submit" variant="primary">
                 Sign in
             </Button>
            </div>
        </form>
    )
}

export default SignIn
