import React, { FunctionComponent } from 'react';
import './OrderSelection.scss';

const OrderSelection: FunctionComponent = () => {
    return (
        <div className="order-selection">
            <nav>
                <div className="order-nav-item">
                    <img src="/assets/icons/restaurant.svg" alt="Custom" />
                    <span>Custom</span>
                </div>

                <div className="order-nav-item">
                    <img src="/assets/icons/bell-covering-hot-dish.svg" alt="Chaud" />
                    <span>Chaud</span>
                </div>

                <div className="order-nav-item">
                    <img src="/assets/icons/cyclone.svg" alt="Froid" />
                    <span>Froid</span>
                </div>


                <div className="order-nav-item">
                    <img src="/assets/icons/orange-juice.svg" alt="Boissons" />
                    <span>Boissons</span>
                </div>

                <div className="order-nav-item">
                    <img src="/assets/icons/cup-cake.svg" alt="Desserts" />
                    <span>Desserts</span>
                </div>


                <div className="order-nav-item">
                    <img src="/assets/icons/menu.svg" alt="Menus" />
                    <span>Menus</span>
                </div>
            </nav>
        </div>
    );
};

export default OrderSelection;
