import React, { FunctionComponent, useCallback } from 'react';
import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';
import ClientSearch from '../layout/ClientSearch';
import DeliveryPage from '../pages/DeliveryPage';
import { RouteComponentProps, Route, NavLink, useHistory } from 'react-router-dom';
import { useAuthExpirationRedirection } from '../../hooks';
import { useAppState } from '../../store';
import { logoutUser } from '../../actions/session.actions';
import authenticationService from '../../services/authentication.service';

import './DashboardPage.scss';

const DashboardPage: FunctionComponent<RouteComponentProps> = ({ match }) => {
    const [ , dispatch ] = useAppState();
    const history = useHistory();

    useAuthExpirationRedirection();

    const logout = useCallback(() => {
        authenticationService.clear();
        dispatch(logoutUser());
        history.push('/');
    }, [ dispatch, history ]);

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

                <a href="/">
                    <img className="brighten" src="/assets/icons/groceries.svg" alt="Products" />
                    <span>Produits</span>
                </a>

                <a href="/">
                    <img className="brighten" src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </a>

                <button type="button" onClick={logout}>
                    <img className="brighten" src="/assets/icons/turn-off.svg" alt="Clients" />
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
                </main>

                <Route exact path={`${match.path}/order`} component={OrderPanel} />
            </div>
        </>
    );
};

export default DashboardPage;
