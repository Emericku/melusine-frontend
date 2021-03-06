import { Product, ProductCategory } from '../models/product.model';
import { Fetcher } from '../models/fetcher.model';

export enum ProductsActionType {
    FETCH_PRODUCTS_STARTED = 'FETCH_PRODUCTS_STARTED',
    FETCH_PRODUCTS_DONE = 'FETCH_PRODUCTS_DONE',
    FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED',
    FETCH_CATEGORIES = 'FETCH_CATEGORIES'
}

export type ProductsAction = 
    { type: ProductsActionType.FETCH_PRODUCTS_STARTED } |
    { type: ProductsActionType.FETCH_PRODUCTS_DONE, content: Product[] } |
    { type: ProductsActionType.FETCH_PRODUCTS_FAILED, error: string } |
    { type: ProductsActionType.FETCH_CATEGORIES, categories: ProductCategory[] }

export const productsFetcher: Fetcher<Product[], ProductsAction> = {
    started() {
        return {
            type: ProductsActionType.FETCH_PRODUCTS_STARTED
        };
    },

    done(content: Product[]) {
        return {
            type: ProductsActionType.FETCH_PRODUCTS_DONE,
            content
        };
    },

    failed(error: string) {
        return {
            type: ProductsActionType.FETCH_PRODUCTS_FAILED,
            error
        };
    }
};

export const fetchCategories = (categories: ProductCategory[]): ProductsAction => ({
    type: ProductsActionType.FETCH_CATEGORIES,
    categories
});
