import React, { FunctionComponent, useCallback } from 'react';
import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import ClientSearch from '../layout/ClientSearch';
import DeliveryPage from '../pages/DeliveryPage';
import ProductPage from '../pages/ProductPage';
import IngredientPage from '../pages/IngredientPage';
import ChartPage from '../pages/ChartPage';
import { RouteComponentProps, Route, NavLink, useHistory } from 'react-router-dom';
import { useAuthExpirationRedirection } from '../../hooks';
import { useAppState } from '../../store';
import { logoutUser } from '../../actions/session.actions';
import authenticationService from '../../services/authentication.service';

import './DashboardPage.scss';
import ClientPage from './ClientPage';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const [, dispatch] = useAppState();
    const history = useHistory();

    useAuthExpirationRedirection();

    const logout = useCallback(() => {
        authenticationService.clear();
        dispatch(logoutUser());
        history.push('/');
    }, [dispatch, history]);

    const isDashboardLinkActive = useCallback((m, location) => {
        return ['/dashboard', '/dashboard/order'].includes(location.pathname)
    }, []);

    return (
        <>
            <nav className="dashboard-menu">
                <NavLink to="/dashboard" isActive={isDashboardLinkActive}>
                    <img className="brighten" src="/assets/icons/crossed-knife-and-fork.svg" alt="Fork and Knife" />
                    <span>Commande</span>
                </NavLink>

                <NavLink to="/dashboard/delivery">
                    <img className="brighten" src="/assets/icons/food.svg" alt="Food" />
                    <span>Livraison</span>
                </NavLink>

                <NavLink to="/dashboard/products">
                    <img className="brighten" src="/assets/icons/groceries.svg" alt="Products" />
                    <span>Produits</span>
                </NavLink>

                <NavLink to="/dashboard/ingredients">
                    <img className="brighten" src="/assets/icons/harvest.svg" alt="Ingredients" />
                    <span>Ingrédients</span>
                </NavLink>

                <NavLink to="/dashboard/clients">
                    <img className="brighten" src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </NavLink>

                <NavLink to="/dashboard/charts">
                    <img className="brighten" src="/assets/icons/chart.svg" alt="Charts" />
                    <span>Statistiques</span>
                </NavLink>

                <button type="button" onClick={logout}>
                    <img className="brighten" src="/assets/icons/turn-off.svg" alt="Deconnexion" />
                    <span>Déconnexion</span>
                </button>
            </nav>

            <div className="dashboard-content">
                <main>
                    <Route exact path={`${match.path}`} component={ClientSearch} />
                    <Route exact path={`${match.path}/order`} component={OrderSelection} />
                    <Route exact path={`${match.path}/delivery`}>
                        <DeliveryPage withInteractions />
                    </Route>
                    <Route exact path={`${match.path}/products`} component={ProductPage} />
                    <Route exact path={`${match.path}/ingredients`} component={IngredientPage} />
                    <Route exact path={`${match.path}/clients`} component={ClientPage} />
                    <Route exact path={`${match.path}/charts`} component={ChartPage} />
                </main>
                <Route exact path={`${match.path}/order`} component={OrderPanel} />
            </div>
        </>
    );
};

export default DashboardPage;
