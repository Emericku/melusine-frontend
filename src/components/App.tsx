import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AppStateProvider } from '../store';
import AuthenticatedRoute from './misc/AuthenticatedRoute';

const App: FunctionComponent = () => {
    return (
        <AppStateProvider>
            <Router>
                <Route exact path="/" component={LoginPage} />
                <AuthenticatedRoute path="/dashboard" component={DashboardPage} />
            </Router>
        </AppStateProvider>
    );
}

export default App;
