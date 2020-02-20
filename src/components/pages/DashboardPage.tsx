import React, { FunctionComponent, useEffect } from 'react';

import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import ClientSearch from '../layout/ClientSearch';
import { RouteComponentProps, Route, NavLink } from 'react-router-dom';
import { useDataFetch } from '../../hooks';
import { ProductsFetcher } from '../../actions/products.actions';
import productService from '../../services/productService';
import './DashboardPage.scss';
import UserPage from './UserPage';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const getProducts = useDataFetch(productService.findAll, ProductsFetcher);

    useEffect(() => {
        getProducts();

        // const intervalId = setInterval(getProducts, 30 * 1000);
        // return () => clearInterval(intervalId);
    }, [ getProducts ]);

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

                <NavLink to="/dashboard/clients">
                    <img src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </NavLink>

                <a href="/">
                    <img src="/assets/icons/turn-off.svg" alt="Clients" />
                    <span>Déconnexion</span>
                </a>
            </nav>

            <div className="dashboard-content">
                <main>
                    <Route exact path={`${match.path}`} component={ClientSearch} />
                    <Route exact path={`${match.path}/order`} component={OrderSelection} />
                    <Route exact path={`${match.path}/clients`} component={UserPage} />

                </main>
                <Route exact path={`${match.path}/order`} component={OrderPanel} />
            </div>
        </>
    );
};

export default DashboardPage;
