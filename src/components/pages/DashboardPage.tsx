import React, { FunctionComponent, useCallback } from 'react';

import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import ClientSearch from '../layout/ClientSearch';
import { RouteComponentProps, Route, NavLink } from 'react-router-dom';
import { ProductsFetcher } from '../../actions/products.actions';
import { useDataFetch } from '../../hooks';
import productService from '../../services/productService';

import './DashboardPage.scss';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const getAllProducts = useCallback(() => productService.findAll(), []);
    useDataFetch(getAllProducts, ProductsFetcher);

    return (
        <>
            <nav className="dashboard-menu">
                <NavLink to="/dashboard">
                    <img src="/assets/icons/crossed-knife-and-fork.svg" alt="Fork and Knife" />
                    <span>Commande</span>
                </NavLink>

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
