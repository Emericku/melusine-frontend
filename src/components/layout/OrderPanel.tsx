import React, { FunctionComponent } from 'react';

import './OrderPanel.scss';

const OrderPanel: FunctionComponent = () => {
    return (
        <aside className="order-panel">
            <header className="pad-1">
                <div className="columns columns-simple">
                    <h2>Commande :</h2>

                    <button type="button">
                        <img width="20em" src="/assets/icons/trash.svg" alt="Cancel"/>
                    </button>
                </div>

                <div className="order-panel-client">
                    <small>Arnold</small>
                    <big>Schwarzenegger</big>
                </div>
            </header>

            <div className="order-panel-credit pad">
                <main className="columns">
                    <img src="/assets/icons/tirelire.svg" alt="Tirelire" />

                    <div>
                        <small>Solde disponible:</small>
                        <big>130,00€</big>
                    </div>
                </main>

                <button className="secondary columns" type="button">
                    Créditer le solde <img width="20em" src="/assets/icons/plus.svg" alt="Crediter"/>
                </button>
            </div>

            <hr/>

            <div className="order-panel-details columns pad">
                <p>Détail (<span className="primary">8 articles</span>)</p>

                <button type="button">
                    <img width="20em" src="/assets/icons/edit.svg" alt="Edit"/>
                </button>
            </div>

            <hr/>

            <ul className="order-panel-items pad">
                <li>
                    <div>
                        <span>1x Sandwich Mitch</span>
                        <span>5,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>1,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich Mitch</span>
                        <span>5,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>1,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich Mitch</span>
                        <span>5,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>1,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>2,00</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich custom</span>
                        <span>2,40</span>
                    </div>

                    <ul>
                        <li>
                            <div>
                                <span>Tomate</span>
                                <span>1,00</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Jambon</span>
                                <span>0,50</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Roblochon</span>
                                <span>0,70</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Salade</span>
                                <span>0,20</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <footer>
                <div className="order-panel-total pad">
                    <span>Total:</span>
                    <span>12,40€</span>
                </div>

                <div className="order-panel-validation pad-1">
                    <button className="primary columns" type="button">
                        Valider la commande <img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider"/>
                    </button>
                </div>
            </footer>
        </aside>
    );
};

export default OrderPanel;
