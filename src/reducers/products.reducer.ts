import { ProductsAction, ProductsActionType } from '../actions/products.actions';
import Product from '../models/product.model';

export const productsInitialState = {
    isLoading: false,
    content: [] as Product[],
    error: ''
};

export default function productsReducer(prevState = productsInitialState, action: ProductsAction) {
    switch (action.type) {
        case ProductsActionType.FETCH_PRODUCTS_STARTED:
            return { ...prevState, isLoading: true, error: '' };

        case ProductsActionType.FETCH_PRODUCTS_DONE:
            return { ...prevState, isLoading: false, content: action.content };

        case ProductsActionType.FETCH_PRODUCTS_FAILED:
            return { ...prevState, isLoading: false, error: action.error };

        default:
            return prevState;
    }
}
