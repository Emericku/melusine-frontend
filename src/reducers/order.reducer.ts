import { Order } from "../models/order.model";
import { OrderAction, OrderActionType } from "../actions/order.actions";

export const orderInitialState: Order = {
    name: '',
    items: [],
    // name: 'Jazi',
    // user: { id: 'mocked-1', firstName: 'Jason', lastName: 'Mangin', nickName: 'Jazi', credit: 120.20 }
};

export default function orderReducer(prevState = orderInitialState, action: OrderAction) {
    switch (action.type) {
        case OrderActionType.INIT_ORDER:
            return { ...prevState, name: action.name, user: action.user, items: [] };

        case OrderActionType.RESET_ORDER:
            return { ...prevState, items: [] };

        case OrderActionType.ADD_ITEM_TO_ORDER: {
            const { items } = prevState;
            const existingItem = items.find(item => item.productId === action.productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                items.push({
                    productId: action.productId,
                    name: action.name,
                    price: action.price,
                    quantity: 1
                });
            }

            return { ...prevState, items: [ ...items ] };
        };
            
        default:
            return prevState;
    }
}
