import React, { FunctionComponent } from 'react';

import './DashboardPage.scss';
import OrderPanel from '../layout/OrderPanel';
import OrderSelection from '../layout/OrderSelection';

const DashboardPage: FunctionComponent = () => {
    return (
        <>
            <nav className="dashboard-menu">
                <button type="button">
                    <img src="/assets/icons/crossed-knife-and-fork.svg" alt="Fork and Knife" />
                    <span>Commande</span>
                </button>

                <button type="button">
                    <img src="/assets/icons/food.svg" alt="Food" />
                    <span>Livraison</span>
                </button>

                <button type="button">
                    <img src="/assets/icons/groceries.svg" alt="Products" />
                    <span>Produits</span>
                </button>

                <button type="button">
                    <img src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </button>

                <button type="button">
                    <img src="/assets/icons/help.svg" alt="Clients" />
                    <span>Aide</span>
                </button>

                <button type="button" className="special-action">
                    <img src="/assets/icons/turn-off.svg" alt="Clients" />
                    <span>Déconnexion</span>
                </button>
            </nav>

            <div className="dashboard-content">
                <main>
                    <OrderSelection />
                </main>

                <OrderPanel />
            </div>
        </>
    );
};

export default DashboardPage;
