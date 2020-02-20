import { ProductsAction } from "../actions/products.actions";
import { OrderAction } from "../actions/order.actions";
import sessionReducer, { sessionInitialState } from "./session.reducer";
import productsReducer, { productsInitialState } from "./products.reducer";
import orderReducer, { orderInitialState } from "./order.reducer";
import { SessionAction } from "../actions/session.actions";

export const initialState = {
    session: sessionInitialState,
    products: productsInitialState,
    order: orderInitialState
};

export type GlobalState = typeof initialState;
export type Action = SessionAction | ProductsAction | OrderAction;

export function reducer({ session, products, order }: GlobalState, action: Action) {
    console.log(action);

    return {
        session: sessionReducer(session, action as SessionAction),
        products: productsReducer(products, action as ProductsAction),
        order: orderReducer(order, action as OrderAction)
    }
};
