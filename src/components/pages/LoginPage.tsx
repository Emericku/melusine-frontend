import React, { FunctionComponent, useCallback, FormEvent, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useAppState } from '../../store';
import { loginUser } from '../../actions/session.actions';
import authenticationService from '../../services/authentication.service';

import './LoginPage.scss';

const LoginPage: FunctionComponent = () => {
    const [ { session }, dispatch ] = useAppState();    
    const history = useHistory();

    const [ email, setEmail ] = useState('emeric.hoerner@gmail.com');
    const [ password, setPassword ] = useState('password');

    const handleChange = useCallback((setter: (value: string) => void) => (e: FormEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }, []);

    const login = useCallback((e: FormEvent) => {
        e.preventDefault();

        authenticationService.authenticate(email, password)
            .then(connectedUser => {
                dispatch(loginUser(connectedUser));
                history.push('/dashboard');
            })
            .catch(e => console.error('Could not authenticate', e));

    }, [ email, password, dispatch, history ]);

    if (session.isAuthenticated) {
        return (
            <Redirect to="/dashboard" />
        );
    }

    return (
        <div className="login-container">
            <div className="login-form decorations">
                <form onSubmit={login}>
                    <img src="assets/logo.svg" alt="Logo Melusine" />

                    <input name="melusine-email" type="text" placeholder="Email" value={email} onChange={handleChange(setEmail)} />
                    <input name="melisuine-password" type="password" placeholder="Mot de passe" value={password} onChange={handleChange(setPassword)} />

                    <button className="primary" type="submit">Connexion</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
