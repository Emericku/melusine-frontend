import React, { FunctionComponent } from 'react';
import './OrderSelection.scss';

const OrderSelection: FunctionComponent = () => {
    return (
        <div className="order-selection">
            <nav>
                <a href="/dashboard" className="order-selection-nav-item">
                    <img src="/assets/icons/restaurant.svg" alt="Custom" />
                    <span>Custom</span>
                </a>

                <div className="order-selection-nav-item">
                    <img src="/assets/icons/bell-covering-hot-dish.svg" alt="Chaud" />
                    <span>Chaud</span>
                </div>

                <div className="order-selection-nav-item">
                    <img src="/assets/icons/cyclone.svg" alt="Froid" />
                    <span>Froid</span>
                </div>


                <div className="order-selection-nav-item">
                    <img src="/assets/icons/orange-juice.svg" alt="Boissons" />
                    <span>Boissons</span>
                </div>

                <div className="order-selection-nav-item">
                    <img src="/assets/icons/cup-cake.svg" alt="Desserts" />
                    <span>Desserts</span>
                </div>


                <div className="order-selection-nav-item">
                    <img src="/assets/icons/menu.svg" alt="Menus" />
                    <span>Menus</span>
                </div>
            </nav>

            <div className="order-selection-choice">
                <div className="order-selection-choice-item" style={{ backgroundImage: `url('/assets/thumbnails/sandwich-froid.png')` }}>
                    <div className="columns columns-simple">
                        Sandwich froid 
                        <img src="/assets/icons/plus.svg" width="15em" alt="Ajout"/>
                    </div>
                </div>

                <div className="order-selection-choice-item" style={{ backgroundImage: `url('/assets/thumbnails/sandwich-chaud.png')` }}>
                    <div className="columns columns-simple">
                        Sandwich chaud 
                        <img src="/assets/icons/plus.svg" width="15em" alt="Ajout"/>
                    </div>
                </div>

                <div className="order-selection-choice-item" style={{ backgroundImage: `url('/assets/thumbnails/salade-gege.png')` }}>
                    <div className="columns columns-simple">
                        Salade Gégé 
                        <img src="/assets/icons/plus.svg" width="15em" alt="Ajout"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSelection;
