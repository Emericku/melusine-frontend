import { ProductsAction } from "../actions/products.actions";
import { OrderAction } from "../actions/order.actions";
import productsReducer, { productsInitialState } from "./products.reducer";
import orderReducer, { orderInitialState } from "./order.reducer";

export const initialState = {
    user: {
        isAuthenticated: false
    },
    products: productsInitialState,
    order: orderInitialState
};

export type GlobalState = typeof initialState;
export type Action = ProductsAction | OrderAction;

export function reducer({ user, products, order }: GlobalState, action: Action) {
    console.log(action);

    return {
        user,
        products: productsReducer(products, action as ProductsAction),
        order: orderReducer(order, action as OrderAction)
    }
};
