import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { Product, ProductResponse } from '../../models/product.model';
import productService from '../../services/product.service';
import ProductList from '../layout/ProductList';
import ProductForm from '../layout/ProductForm';
import './ProductPage.scss';
import { useToast } from '../../hooks';

const ProductPage: FunctionComponent = () => {
    const createToast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [selctedProduct, setSelectedProduct] = useState<Product>();

    const refreshProducts = useCallback(() => {
        productService.getProducts()
            .then(response => setProducts(response))
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"))
            .finally(() => setLoading(false));
    }, [createToast])

    useEffect(() => {
        setLoading(true);
        refreshProducts();

    }, [refreshProducts]);

    const selectProduct = useCallback((product: Product) => {
        setSelectedProduct(product)
    }, [])

    const resetProduct = useCallback(() => {
        setSelectedProduct(undefined);
    }, []);

    return (
        <div className="product-main">
            <div className="product-list">
                {isLoading ?
                    'Loading ...' :
                    <ProductList products={products} selectProduct={selectProduct} />
                }
            </div>
            <div className="product-form">
                <ProductForm selectedProduct={selctedProduct} resetProduct={resetProduct} refreshProducts={refreshProducts} />
            </div>
        </div>
    );
}
export default ProductPage;
