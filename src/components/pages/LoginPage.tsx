import React, { FunctionComponent, useCallback, FormEvent, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useAppState } from '../../store';
import { useChangeTitle, useToast } from '../../hooks';
import { loginUser } from '../../actions/session.actions';
import authenticationService from '../../services/authentication.service';
import config from '../../config';

import './LoginPage.scss';

const LoginPage: FunctionComponent = () => {
    const history = useHistory();
    const createToast = useToast();
    const [ { session }, dispatch ] = useAppState();    
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useChangeTitle('Connexion');

    const handleChange = useCallback((setter: (value: string) => void) => (e: FormEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }, []);

    const login = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        try {
            const connectedUser = await authenticationService.authenticate(email, password);
            dispatch(loginUser(connectedUser));
            history.push('/dashboard');
        } catch (e) {
            createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
        }
    }, [ email, password, dispatch, history, createToast ]);

    if (session.isAuthenticated) {
        return (
            <Redirect to="/dashboard" />
        );
    }

    return (
        <div className="login-container">
            <div className="login-form decorations">
                <form onSubmit={login}>
                    <img src="assets/logo.svg" alt={`Logo ${config.appName}`} />

                    <input name={`${config.appName?.toLowerCase()}-email`} type="text" placeholder="Email" value={email} onChange={handleChange(setEmail)} autoComplete="off" />
                    <input name={`${config.appName?.toLowerCase()}-password`} type="password" placeholder="Mot de passe" value={password} onChange={handleChange(setPassword)} />

                    <button className="primary" type="submit">Connexion</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
