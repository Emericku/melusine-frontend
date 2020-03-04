import React, { FunctionComponent, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AppStateProvider } from '../store';
import AuthenticatedRoute from './misc/AuthenticatedRoute';
import ToastZone from './misc/ToastZone';
import DeliveryPage from './pages/DeliveryPage';
import ClientPage from './pages/ClientPage';
import ProductPage from './pages/ProductPage';
import IngredientPage from './pages/IngredientPage';

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
                <Route exact path="/cooking">
                    <div className="page-wrapper">
                        <DeliveryPage withInteractions={false} />
                    </div>
                </Route>
                <AuthenticatedRoute exact path="/products" component={ProductPage} />
                <AuthenticatedRoute exact path="/ingredients" component={IngredientPage} />
                <AuthenticatedRoute exact path="/clients" component={ClientPage} />
            </Router>
        </AppStateProvider>
    );
}

export default App;
