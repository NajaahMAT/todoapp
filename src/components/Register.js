import React , {useState} from 'react';
import styles from '../styles/modules/signin.module.scss';
import {Navigate} from 'react-router-dom';
import Button from './Button';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        console.log({
            name,
            email,
            password
        })

        const response = await fetch('http://localhost:8080/signup',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email,
                'password': password,
                'name': name
            })
        })

        const content = await response.json()
        console.log(content)
        setRedirect(true)
    }

    if (redirect){
        return <Navigate to="/signin"/>
    }

    return(
        <form onSubmit={submit} className={styles.formSignin} >
            <h1 className={styles.formTitle}>Please register</h1>

            <input
                className={styles.formControl}
                placeholder="User name"
                required
                onChange={e => setName(e.target.value)}
            />
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
                     Register
                </Button>
            </div>
        </form>
    )
}

export default Register
