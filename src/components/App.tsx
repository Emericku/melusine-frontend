import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App: FunctionComponent = () => {
    return (
        <Router>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
        </Router>
    );
}

export default App;
