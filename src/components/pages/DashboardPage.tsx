import React, { FunctionComponent, useEffect, useCallback } from 'react';

import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import ClientSearch from '../layout/ClientSearch';
import { RouteComponentProps, Route, NavLink, useHistory } from 'react-router-dom';
import { useDataFetch, useAuthExpirationRedirection } from '../../hooks';
import { ProductsFetcher } from '../../actions/products.actions';
import productService from '../../services/product.service';

import './DashboardPage.scss';
import { useAppState } from '../../store';
import { logoutUser } from '../../actions/session.actions';
import authenticationService from '../../services/authentication.service';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const [ , dispatch ] = useAppState();
    const getProducts = useDataFetch(productService.findAll, ProductsFetcher);
    const history = useHistory();

    useAuthExpirationRedirection('/');

    useEffect(() => {
        getProducts();

        // const timeoutId = setTimeout(getProducts, 30 * 1000);
        // return () => clearTimeout(timeoutId);
    }, [ getProducts ]);

    const logout = useCallback(() => {
        authenticationService.clear();
        dispatch(logoutUser());
        history.push('/');
    }, [ dispatch, history ]);

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

                <button type="button" onClick={logout}>
                    <img src="/assets/icons/turn-off.svg" alt="Clients" />
                    <span>Déconnexion</span>
                </button>
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
