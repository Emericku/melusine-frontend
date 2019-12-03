import React, { FunctionComponent } from 'react';

import './DashboardPage.scss';
import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import { RouteComponentProps, Route } from 'react-router-dom';
import ClientSearch from '../layout/ClientSearch';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    return (
        <>
            <nav className="dashboard-menu">
                <a href="/" className="active">
                    <img src="/assets/icons/crossed-knife-and-fork.svg" alt="Fork and Knife" />
                    <span>Commande</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/food.svg" alt="Food" />
                    <span>Livraison</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/groceries.svg" alt="Products" />
                    <span>Produits</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/help.svg" alt="Clients" />
                    <span>Aide</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/turn-off.svg" alt="Clients" />
                    <span>Déconnexion</span>
                </a>
            </nav>

            <div className="dashboard-content">
                <main>
                    <Route exact path={`${match.path}`} component={ClientSearch} />
                    <Route exact path={`${match.path}/order`} component={OrderSelection} />
                </main>

                <Route exact path={`${match.path}/order`} component={OrderPanel} />
            </div>
        </>
    );
};

export default DashboardPage;
