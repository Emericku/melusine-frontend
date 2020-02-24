import React, { FunctionComponent, useEffect, useCallback } from 'react';
import { useAppState } from '../../store';
import { useHistory } from 'react-router';
import { useModal, useToast } from '../../hooks';
import { resetOrder, clearOrder, removeItemFromOrder } from '../../actions/order.actions';
import { priceFormatter } from '../../utils';
import { OrderRequest, OrderItem } from '../../models/order.model';
import orderService from '../../services/order.service';
import Modal from '../misc/Modal';
import CreditCharger from './CreditCharger';

import './OrderPanel.scss';

const OrderPanel: FunctionComponent = () => {
    const history = useHistory();
    const [ { order }, dispatch ] = useAppState();
    const createToast = useToast();
    const { isModalOpened, toggleModal } = useModal();

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

    const removeItem = useCallback((item: OrderItem) => () => {
        dispatch(removeItemFromOrder(item.productId));
    }, [ dispatch ]);

    const removeAll = useCallback(() => {
        dispatch(resetOrder());
    }, [ dispatch ]);

    const isDisabled = useCallback(() => {
        if (!order.user && order.items.length > 0 ) {
            return false;
        }

        const credit = order.user ? order.user.credit : 0;
        return order.items.length === 0 || computePrice() > credit;
    }, [ order, computePrice ]);

    const submitOrder = useCallback(async () => {
        const request = new OrderRequest(
            order.items.map(({ productId, quantity }) => ({ productId, quantity })),
            order.name,
            order.user?.id
        );

        try {
            const createdOrder = await orderService.createOrder(request);
            createToast('success', `Pour ${order.name} ${priceFormatter.format(createdOrder.total)}`);
            dispatch(clearOrder());
        } catch (e) {
            createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
        }
    }, [ order, dispatch, createToast ]);

    return (
        <aside className="order-panel">
            {
                isModalOpened && <Modal title={`Créditer le solde de ${order.user?.firstName} ${order.user?.lastName}`} close={toggleModal}>
                    <CreditCharger />
                </Modal>
            }

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

            {
                order.user && <div className="order-panel-credit pad">
                    <div className="columns space-around">
                        <img src="/assets/icons/tirelire.svg" alt="Tirelire" />

                        <div>
                            <small>Solde disponible:</small>
                            <big>{priceFormatter.format(order.user ? order.user.credit : 0)}</big>
                        </div>
                    </div>

                    {
                        order.user && <button className="secondary columns space-button" type="button" onClick={toggleModal}>
                            <span>Créditer le solde</span>
                            <span><img width="20em" src="/assets/icons/plus.svg" alt="Crediter"/></span>
                        </button>
                    }
                </div>
            }

            <hr/>

            <div className="order-panel-details pad-1">
                <p>Détail (<span className="primary">{order.items.length} article{order.items.length > 1 ? 's' : ''}</span>)</p>
            </div>

            <hr/>

            <ul className="order-panel-items pad">
                {
                    order.items.map((item, index) => (
                        <li key={index} onClick={removeItem(item)}>
                            <div className="order-panel-item">
                                <span>{item.quantity}x {item.name}</span>
                                <span>{priceFormatter.format(item.quantity * item.price)}</span>
                                <button type="button">×</button>
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
                    <button className="primary columns space-button" type="button" onClick={submitOrder} disabled={isDisabled()}>
                        <span>Valider la commande</span>
                        <span><img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider"/></span>
                    </button>
                </div>
            </footer>
        </aside>
    );
};

export default OrderPanel;
