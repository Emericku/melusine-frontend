import React, { FunctionComponent, useEffect, useCallback, useState } from 'react';
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
    const createToast = useToast();
    const [ { order }, dispatch ] = useAppState();
    const { isModalOpened, toggleModal } = useModal();
    const [ isSubmitting, setSubmitting ] = useState(false);

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
        if (isSubmitting) {
            return true;
        }

        if (!order.user && order.items.length > 0 ) {
            return false;
        }

        const credit = order.user ? order.user.credit : 0;
        return order.items.length === 0 || computePrice() > credit;
    }, [ isSubmitting, order, computePrice ]);

    const submitOrder = useCallback(async () => {
        const orderItems: string[] = [];
        
        order.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                orderItems.push(item.productId);
            }
        });

        const request = new OrderRequest(
            orderItems,
            order.name,
            order.user?.id
        );

        setSubmitting(true);

        try {
            const createdOrder = await orderService.createOrder(request);
            createToast('success', `Commande validée pour ${order.name} ${priceFormatter.format(createdOrder.total)}`);
            dispatch(clearOrder());
        } catch (e) {
            createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
        } finally {
            setSubmitting(false);
        }   
    }, [ order, dispatch, createToast ]);

    return (
        <aside className="order-panel">
            {
                isModalOpened && <Modal title={`Créditer le solde de ${order.user?.firstName} ${order.user?.lastName}`} close={toggleModal}>
                    <CreditCharger />
                </Modal>
            }

            <header>
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
                order.user && <div className="order-panel-credit">
                    <div className="columns space-around">
                        <img width="60em" src="/assets/icons/tirelire.svg" alt="Tirelire" />

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

            <div className="order-panel-details">
                <p>Détail (<span className="primary">{order.items.length} article{order.items.length > 1 ? 's' : ''}</span>)</p>
            </div>

            <hr/>

            <ul className="order-panel-items">
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
                <div className="order-panel-total">
                    <span>Total:</span>
                    <span>{priceFormatter.format(computePrice())}</span>
                </div>

                <div className="order-panel-validation">
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
