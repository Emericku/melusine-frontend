import React, { FunctionComponent, useState, useCallback, useEffect, useRef } from 'react';
import { priceFormatter } from '../../utils';
import { useAppState } from '../../store';
import { useChangeTitle, useModal, useToast } from '../../hooks';
import { Product } from '../../models/product.model';
import { addItemToOrder } from '../../actions/order.actions';
import { productsFetcher, fetchCategories } from '../../actions/products.actions';
import productService from '../../services/product.service';
import config from '../../config';
import Spinner from '../misc/Spinner';
import Modal from '../misc/Modal';
import PreparationStepper from './PreparationStepper';

import './OrderSelection.scss';

const OrderSelection: FunctionComponent = () => {
    const pollingId = useRef<any>();
    const [ { products }, dispatch ] = useAppState();
    const [ currentCategory, setCurrentCategory ] = useState('');
    const [ currentCustom, setCurrentCustom ] = useState<Product>();
    const { isModalOpened, toggleModal } = useModal();
    const createToast = useToast();

    useChangeTitle('Commande');

    const fetchProducts = useCallback(() => {
        dispatch(productsFetcher.started());

        return productService.findCategories()
            .then(categories => {
                dispatch(fetchCategories(categories))
                return productService.findAll();
            })
            .then(
                response => dispatch(productsFetcher.done(response)),
                e => {
                    dispatch(productsFetcher.failed(e.message));
                    createToast('error', 'Erreur lors de la récupération des produits');
                }
            );
    }, [ dispatch, createToast ]);

    const pollProducts = useCallback(() => {
        const timeoutId = setTimeout(() => {
            productService.findAll()
                .then(response => dispatch(productsFetcher.done(response)))
                .catch(e => {
                    dispatch(productsFetcher.failed(e.message));
                    createToast('error', 'Erreur lors de la récupération des produits');
                })
                .finally(() => pollProducts());
        }, config.pollingFrequency * 1000);

        pollingId.current = timeoutId;
    }, [ dispatch, createToast ]);

    useEffect(() => {
        fetchProducts()
            .then(() => pollProducts());

        return () => clearTimeout(pollingId.current);
    }, [ fetchProducts, pollProducts, pollingId ]);

    useEffect(() => {
        if (products.categories.length > 0) {
            setCurrentCategory(products.categories[0].name);
        }
    }, [ products.categories ]);

    const selectCategory = useCallback((category: string) => () => {
        setCurrentCategory(category);
    }, [ setCurrentCategory ]);

    const addItem = useCallback((product: Product) => {
        if (product.price) {
            dispatch(addItemToOrder(product.id, product.name, product.price));
        }
    }, [ dispatch ]);

    const addCustomItem = useCallback((product: Product) => {
        addItem(product);
        toggleModal();
    }, [ addItem, toggleModal ]);

    const handleItem = useCallback((product: Product) => () => {
        if (product.quantity === 0) {
            return;
        }

        if (product.category === 'CUSTOM') {
            setCurrentCustom(product);
            toggleModal();
        } else {
            addItem(product);
        }
    }, [ toggleModal, addItem ]);

    return (
        <div className="order-selection">
            {
                isModalOpened && currentCustom && <Modal title={`Préparation d'un(e) ${currentCustom.name.toLowerCase()}`} close={toggleModal}>
                    <PreparationStepper addItem={addCustomItem} originalProduct={currentCustom} />
                </Modal>
            }

            <nav>
                {
                    products.categories.map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`order-selection-nav-item${category.name === currentCategory ? ' current' : ''}`}
                            onClick={selectCategory(category.name)}
                            style={{ borderColor: category.color, color: category.color }}
                        >
                            <img src={`data:image/svg+xml;base64, ${category.icon}`} alt={category.name} />
                            <span>{category.name.toLowerCase()}</span>
                        </button>
                    ))
                }
            </nav>

            <div className="order-selection-choice">
                {
                    products.isLoading ? <Spinner /> :
                        products.error.length > 0 ? <div className="primary">Impossible de récupérer les produits</div> :
                            products.content.filter(product => product.category === currentCategory).map((product, index) => (
                                <div
                                    key={index}
                                    className="order-selection-choice-item"
                                    style={{ backgroundImage: `url('data:image/png;base64, ${product.image}')` }}
                                    onClick={handleItem(product)}
                                >
                                    <div className="order-selection-choice-item-info">
                                        {
                                            <span className={`order-selection-choice-item-stock${product.quantity === 0 ? ' empty' : ''}`}>
                                                {product.quantity}
                                            </span>
                                        }

                                        {
                                            product.price && <span className="order-selection-choice-item-price">
                                                {priceFormatter.format(product.price)}
                                            </span>
                                        }
                                    </div>

                                    <div className="order-selection-choice-item-action columns space-button">
                                        <span>{product.name}</span>
                                        <span><img src="/assets/icons/plus.svg" width="20em" alt="Ajout" /></span>
                                    </div>
                                </div>
                            ))
                }
            </div>
        </div>
    );
};

export default OrderSelection;
