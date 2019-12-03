import React, { FunctionComponent } from 'react';
import { priceFormatter } from '../../utils';

import './OrderPanel.scss';

const OrderPanel: FunctionComponent = () => {
    return (
        <aside className="order-panel">
            <header className="pad-1">
                <div className="columns columns-simple">
                    <h2 className="primary">Commande :</h2>

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
                <div className="columns">
                    <img src="/assets/icons/tirelire.svg" alt="Tirelire" />

                    <div>
                        <small>Solde disponible:</small>
                        <big>{priceFormatter.format(130.00)}</big>
                    </div>
                </div>

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
                        <span>{priceFormatter.format(5.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>{priceFormatter.format(1.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich custom</span>
                        <span>{priceFormatter.format(2.40)}</span>
                    </div>

                    <ul>
                        <li>
                            <div>
                                <span>Tomate</span>
                                <span>{priceFormatter.format(1.00)}</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Jambon</span>
                                <span>{priceFormatter.format(0.50)}</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Roblochon</span>
                                <span>{priceFormatter.format(0.70)}</span>
                            </div>
                        </li>

                        <li>
                            <div>
                                <span>Salade</span>
                                <span>{priceFormatter.format(0.20)}</span>
                            </div>
                        </li>
                    </ul>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich Mitch</span>
                        <span>{priceFormatter.format(5.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>{priceFormatter.format(1.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Sandwich Mitch</span>
                        <span>{priceFormatter.format(5.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>1x Coca Light</span>
                        <span>{priceFormatter.format(1.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Chips salé</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>

                <li>
                    <div>
                        <span>2x Mefine</span>
                        <span>{priceFormatter.format(2.00)}</span>
                    </div>
                </li>
            </ul>

            <footer>
                <div className="order-panel-total pad">
                    <span>Total:</span>
                    <span>{priceFormatter.format(12.40)}</span>
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
