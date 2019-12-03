import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import './OrderSelection.scss';
import { priceFormatter } from '../../utils';
import productService from '../../services/productService';

type Category = 'Custom' | 'Chaud' | 'Froid' | 'Boissons' | 'Desserts';

interface CategoryItem {
    name: Category;
    image: string;
}

const categories: CategoryItem[] = [
    {
        name: 'Custom',
        image: '/assets/icons/restaurant.svg'
    },

    {
        name: 'Chaud',
        image: '/assets/icons/bell-covering-hot-dish.svg'
    },

    {
        name: 'Froid',
        image: '/assets/icons/cyclone.svg'
    },

    {
        name: 'Boissons',
        image: '/assets/icons/orange-juice.svg'
    },

    {
        name: 'Desserts',
        image: '/assets/icons/cup-cake.svg'
    }
];

const OrderSelection: FunctionComponent = () => {
    const [ products, setProducts ] = useState<any[]>([]);
    const [ current, setCurrent ] = useState<Category>(categories[0].name);

    useEffect(() => {
        productService.findAll()
            .then(setProducts)
            .catch(e => console.error('Error while retrieving products', e));
    }, []);

    const select = useCallback((category: Category) => () => {
        setCurrent(category);
    }, [ setCurrent ]);

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
                    products.filter(product => product.category === current).map((product, index) => (
                        <div key={index} className="order-selection-choice-item" style={{ backgroundImage: `url('${product.image}')` }}>
                            <div className="order-selection-choice-item-info">
                                {
                                    product.quantity && <span className={`order-selection-choice-item-stock${product.quantity === 0 ? ' empty' : ''}`}>
                                        {product.quantity}
                                    </span>
                                }

                                <span className="order-selection-choice-item-price">
                                    {priceFormatter.format(product.price)} 
                                </span>
                            </div>

                            <div className="order-selection-choice-item-action columns columns-simple">
                                {product.name}
                                <img src="/assets/icons/plus.svg" width="15em" alt="Ajout" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default OrderSelection;
