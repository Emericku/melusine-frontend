import { ProductsAction, ProductsActionType } from '../actions/products.actions';
import { Product, ProductCategory } from '../models/product.model';

export const productsInitialState = {
    isLoading: false,
    categories: [] as ProductCategory[],
    content: [] as Product[],
    error: ''
};

export default function productsReducer(prevState = productsInitialState, action: ProductsAction) {
    switch (action.type) {
        case ProductsActionType.FETCH_PRODUCTS_STARTED:
            return { ...prevState, isLoading: prevState.content.length === 0, error: '' };

        case ProductsActionType.FETCH_CATEGORIES:
            return { ...prevState, categories: action.categories };

        case ProductsActionType.FETCH_PRODUCTS_DONE:
            return { ...prevState, isLoading: false, content: action.content, error: '' };

        case ProductsActionType.FETCH_PRODUCTS_FAILED:
            return { ...prevState, isLoading: false, error: action.error };

        default:
            return prevState;
    }
}
