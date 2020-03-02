import React, { FunctionComponent } from 'react';
import { ProductResponse, Product, categoryMapping } from '../../models/product.model';
import './ProductList.scss';
import { priceFormatter } from '../../utils';

interface ProductListProps {
    products: ProductResponse[];
    selectProduct: (product: Product) => void;
}

const ProductList: FunctionComponent<ProductListProps> = (props) => {
    return (
        <div className="product-list">
            <h3>Liste de produits</h3>
            <table>
                <thead>
                <tr>
                    <th className="product-last-name">Nom</th>
                    <th className="product-first-name">Prix</th>
                    <th className="product-nick-name">Ingrédients</th>
                    <th className="product-section">Catégorie</th>
                    <th className="product-credit">Quantité</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.products.map((product, index) => (
                        <tr key={index} onClick={() => props.selectProduct(product)}>
                            <td className="product-last-name">{product.name}</td>
                            <td className="product-first-name">{product.price && priceFormatter.format(product.price)}</td>
                            <td className="product-nick-name">{product.ingredients.map(ingredient => ingredient.name).join(', ')}</td>
                            <td className="product-section">{
                            categoryMapping.find((c) => c.value===product.category)?.label
                            }</td>
                            <td className="product-credit">{product.quantity}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
