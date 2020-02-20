import React, { FunctionComponent, useEffect, useCallback } from 'react';
import { useAppState } from '../../store';
import { useHistory } from 'react-router';
import { resetOrder } from '../../actions/order.actions';
import { priceFormatter } from '../../utils';

import './OrderPanel.scss';

const OrderPanel: FunctionComponent = () => {
    const history = useHistory();
    const [ { order }, dispatch ] = useAppState();

    useEffect(() => {
        if (order.name.length === 0) {
            history.push('/dashboard');
        }
    }, [ order, history ]);

    const computePrice = useCallback(() => {
        return order.items
            .map(({ quantity, price }) => quantity * price)
            .reduce((a, b) => a + b, 0);
    }, [ order ]);

    const removeAll = useCallback(() => {
        dispatch(resetOrder());
    }, [ dispatch ]);

    const isDisabled = useCallback(() => {
        const credit = order.user ? order.user.credit : 0;
        return order.items.length === 0 || computePrice() > credit;
    }, [ order, computePrice ]);

    return (
        <aside className="order-panel">
            <header className="pad-1">
                <div className="columns space-between">
                    <h2 className="primary">Commande :</h2>

                    <button type="button">
                        <img width="20em" src="/assets/icons/trash.svg" alt="Cancel" onClick={removeAll} />
                    </button>
                </div>

                <div className="order-panel-client">
                    { order.user ? (
                        <>
                            <small>{order.user.firstName}</small>
                            <big>{order.user.lastName}</big>
                        </>
                    ) : <big>{order.name}</big> }
                </div>
            </header>

            <div className="order-panel-credit pad">
                <div className="columns space-around">
                    <img src="/assets/icons/tirelire.svg" alt="Tirelire" />

                    <div>
                        <small>Solde disponible:</small>
                        <big>{priceFormatter.format(order.user ? order.user.credit : 0)}</big>
                    </div>
                </div>

                <button className="secondary columns space-button" type="button">
                    <span>Créditer le solde</span>
                    <span><img width="20em" src="/assets/icons/plus.svg" alt="Crediter"/></span>
                </button>
            </div>

            <hr/>

            <div className="order-panel-details pad columns space-between">
                <p>Détail (<span className="primary">{order.items.length} article{order.items.length > 1 ? 's' : ''}</span>)</p>

                <button type="button">
                    <img width="20em" src="/assets/icons/edit.svg" alt="Edit"/>
                </button>
            </div>

            <hr/>

            <ul className="order-panel-items pad">
                {
                    order.items.map((item, index) => (
                        <li key={index}>
                            <div>
                                <span>{item.quantity}x {item.name}</span>
                                <span>{priceFormatter.format(item.quantity * item.price)}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <footer>
                <div className="order-panel-total pad">
                    <span>Total:</span>
                    <span>{priceFormatter.format(computePrice())}</span>
                </div>

                <div className="order-panel-validation pad-1">
                    <button className="primary columns space-button" type="button" disabled={isDisabled()}>
                        <span>Valider la commande</span>
                        <span><img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider"/></span>
                    </button>
                </div>
            </footer>
        </aside>
    );
};

export default OrderPanel;
