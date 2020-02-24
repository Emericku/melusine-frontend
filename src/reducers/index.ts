import { SessionAction } from "../actions/session.actions";
import { ProductsAction } from "../actions/products.actions";
import { OrderAction } from "../actions/order.actions";
import { ToastsAction } from "../actions/toasts.actions";

import sessionReducer, { sessionInitialState } from "./session.reducer";
import productsReducer, { productsInitialState } from "./products.reducer";
import orderReducer, { orderInitialState } from "./order.reducer";
import toastsReducer, { toastsInitialState } from "./toasts.reducer";

export const initialState = {
    session: sessionInitialState,
    products: productsInitialState,
    order: orderInitialState,
    toasts: toastsInitialState
};

export type GlobalState = typeof initialState;
export type Action = SessionAction | ProductsAction | OrderAction | ToastsAction;

export function reducer({ session, products, order, toasts }: GlobalState, action: Action): GlobalState {
    if (process.env.NODE_ENV === 'development') {
        console.log(action);
    }

    return {
        session: sessionReducer(session, action as SessionAction),
        products: productsReducer(products, action as ProductsAction),
        order: orderReducer(order, action as OrderAction),
        toasts: toastsReducer(toasts, action as ToastsAction)
    }
};
