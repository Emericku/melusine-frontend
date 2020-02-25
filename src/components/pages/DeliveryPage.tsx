import React, { FunctionComponent, useState, useEffect, useRef, useCallback } from 'react';
import { PageRequest, Page } from '../../models/page.model';
import orderService from '../../services/order.service';
import { OrderItemResponse, OrderItemStatus } from '../../models/order.model';
import { useToast } from '../../hooks';
import config from '../../config';
import { formatNumber } from '../../utils';
import Spinner from '../misc/Spinner';

import './DeliveryPage.scss';

interface DeliveryPageProps {
    withInteractions: boolean
}

const DeliveryPage: FunctionComponent<DeliveryPageProps> = ({ withInteractions }) => {
    const pollingId = useRef<any>();
    const [ isLoading, setLoading ] = useState(false);
    const [ pageRequest, setPageRequest ] = useState(new PageRequest());
    const [ pageResponse, setPageResponse ] = useState<Page<OrderItemResponse>>();
    const [ refreshDate, setRefreshDate ] = useState<Date>();
    const createToast = useToast();

    const fetchOrderItems = useCallback(() => {
        setLoading(true);

        return orderService.getOrderItems(pageRequest)
            .then(
                page => {
                    setPageResponse(page);
                    setRefreshDate(new Date());
                },
                e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible")
            )
            .finally(() => setLoading(false));
    }, [ pageRequest, createToast ]);

    const pollOrderItems = useCallback(() => {
        const timeoutId = setTimeout(() => {
            orderService.getOrderItems(pageRequest)
                .then(page => {
                    setPageResponse(page);
                    setRefreshDate(new Date());
                })
                .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"))
                .finally(() => pollOrderItems());
        }, config.pollingFrequency * 1000);

        pollingId.current = timeoutId;
    }, [ pageRequest, createToast ]);

    useEffect(() => {
        fetchOrderItems()
            .then(() => pollOrderItems());

        return () => clearTimeout(pollingId.current);
    }, [ fetchOrderItems, pollOrderItems, pollingId ]);

    const previousPage = useCallback(() => {
        if (pageResponse?.first) {
            return;
        }

        setPageRequest(pageRequest.previous());
    }, [ pageResponse, pageRequest ]);

    const nextPage = useCallback(() => {
        if (pageResponse?.last) {
            return;
        }

        setPageRequest(pageRequest.next());
    }, [ pageResponse, pageRequest ]);

    const updateOrderItem = useCallback(async (orderItem: OrderItemResponse, status: OrderItemStatus, message: string) => {
        try {
            await orderService.updateOrderItemStatus(orderItem.id, status);
            createToast('success', message);
            fetchOrderItems();
        } catch (e) {
            createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
        } 
    }, [ createToast, fetchOrderItems ]);

    const deliverOrderItem = useCallback((orderItem: OrderItemResponse) => () => {
        updateOrderItem(orderItem, OrderItemStatus.DELIVER, `${orderItem.productName} prêt pour ${orderItem.clientName}`);
    }, [ updateOrderItem ]);

    const cancelOrderItem = useCallback((orderItem: OrderItemResponse) => () => {
        updateOrderItem(orderItem, OrderItemStatus.CANCEL, `${orderItem.productName} annulé pour ${orderItem.clientName}`);
    }, [ updateOrderItem ]);

    return (
        <div className="delivery">
            {
                isLoading ? <Spinner /> :
                    <>
                        <div className="delivery-last-update">
                            Dernière mise à jour : {refreshDate && `${formatNumber(refreshDate.getHours())}h${formatNumber(refreshDate.getMinutes())}`}
                        </div>

                        {
                            withInteractions && <div className="delivery-pagination columns space-around">
                                <button type="button" className="secondary" onClick={nextPage} disabled={pageResponse?.first}>&laquo; Précédent</button>
                                <button type="button" className="secondary" onClick={previousPage} disabled={pageResponse?.last}>Suivant &raquo;</button>
                            </div>
                        }

                        <div className="delivery-order-items">
                            {
                                pageResponse?.content.length === 0 ?
                                    'Aucune commande' :
                                    pageResponse?.content.map(item => (
                                        <div className="delivery-order-item" key={item.id}>
                                            <div className="delivery-order-item-client">
                                                {item.clientName}
                                            </div>

                                            <div className="delivery-order-item-product primary">
                                                {item.productName}
                                            </div>

                                            <div className="delivery-order-item-ingredients">
                                                {
                                                    item.ingredients.length > 1 &&
                                                        <span>Ingrédients : {item.ingredients && item.ingredients.join(', ')}</span>
                                                }
                                            </div>

                                            {
                                                withInteractions && <div className="delivery-order-item-actions">
                                                    <button type="button" onClick={deliverOrderItem(item)}>✓</button>
                                                    <button type="button" onClick={cancelOrderItem(item)}>×</button>
                                                </div>
                                            }
                                        </div>
                                    ))
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default DeliveryPage;
