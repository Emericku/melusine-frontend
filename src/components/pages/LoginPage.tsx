import React, { FunctionComponent, useCallback, FormEvent } from 'react';
import './LoginPage.scss';
import { useHistory } from 'react-router-dom';

const LoginPage: FunctionComponent = () => {
    const history = useHistory();

    const login = useCallback((e: FormEvent) => {
        history.push('/dashboard');
    }, [history]);

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={login}>
                    <img src="assets/logo.svg" alt="Logo Melusine" />

                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Mot de passe" />

                    <button className="primary" type="submit">Connexion</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
