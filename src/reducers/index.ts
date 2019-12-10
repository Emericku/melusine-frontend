import { ProductsAction } from "../actions/products.actions";
import productsReducer, { productsInitialState } from "./products.reducer";

export const initialState = {
    user: {
        isAuthenticated: false
    },
    products: productsInitialState,
    order: {}
};

export type GlobalState = typeof initialState;
export type Action = ProductsAction;

export function reducer({ user, products, order }: GlobalState, action: Action) {
    console.log(action);

    return {
        user,
        products: productsReducer(products, action),
        order
    }
};
