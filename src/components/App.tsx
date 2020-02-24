import React, { FunctionComponent, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AppStateProvider } from '../store';
import AuthenticatedRoute from './misc/AuthenticatedRoute';
import ToastZone from './misc/ToastZone';

const App: FunctionComponent = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production' && document.body.requestFullscreen) {
            document.addEventListener('click', () => {
                document.body.requestFullscreen()
                    .catch(() => alert("Le plein écran n'a pas pu être appliqué"));
            }, { once: true });
        }
    }, []);

    return (
        <AppStateProvider>
            <Router>
                <ToastZone />
                <Route exact path="/" component={LoginPage} />
                <AuthenticatedRoute path="/dashboard" component={DashboardPage} />
            </Router>
        </AppStateProvider>
    );
}

export default App;
