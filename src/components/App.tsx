import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import { AppStateProvider } from '../store';

const App: FunctionComponent = () => {
    return (
        <AppStateProvider>
            <Router>
                <Route exact path="/" component={LoginPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/clients" component={UserPage} />
            </Router>
        </AppStateProvider>
    );
}

export default App;
