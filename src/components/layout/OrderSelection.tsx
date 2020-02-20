import React, { FunctionComponent, useState, useCallback } from 'react';
import { priceFormatter } from '../../utils';
import { useAppState } from '../../store';
import Product, { Category, categories } from '../../models/product.model';
import Spinner from '../misc/Spinner';

import './OrderSelection.scss';
import { addItemToOrder } from '../../actions/order.actions';

const OrderSelection: FunctionComponent = () => {
    const [ { products }, dispatch ] = useAppState();
    const [ current, setCurrent ] = useState<Category>(categories[0].name);

    const select = useCallback((category: Category) => () => {
        setCurrent(category);
    }, [ setCurrent ]);

    const addItem = useCallback((product: Product) => () => {
        dispatch(addItemToOrder(product.id, product.name, product.price));
    }, [ dispatch ]);

    return (
        <div className="order-selection">
            <nav>
                {
                    categories.map((category, index) => (
                        <button key={index} type="button" className="order-selection-nav-item" onClick={select(category.name)}>
                            <img src={category.image} alt={category.name} />
                            <span>{category.name}</span>
                        </button>
                    ))
                }
            </nav>

            <div className="order-selection-choice">
                {
                    products.isLoading ? <Spinner /> : 
                    products.error ? <div>{products.error}</div> :
                    products.content.filter(product => product.category === current).map((product, index) => (
                        <div 
                            key={index} 
                            className="order-selection-choice-item" 
                            style={{ backgroundImage: `url('${product.image}')` }}
                            onClick={addItem(product)}
                        >
                            <div className="order-selection-choice-item-info">
                                {
                                    <span className={`order-selection-choice-item-stock${product.quantity === 0 ? ' empty' : ''}`}>
                                        {product.quantity}
                                    </span>
                                }

                                <span className="order-selection-choice-item-price">
                                    {priceFormatter.format(product.price)} 
                                </span>
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
