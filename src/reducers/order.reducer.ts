import { Order } from "../models/order.model";
import { OrderAction, OrderActionType } from "../actions/order.actions";

export const orderInitialState: Order = {
    name: '',
    items: [],
    // name: "Mick",
    // user: {
    //     "id":"6509e418-a12a-4a8a-b7af-8df1f7bcce85",
    //     "firstName":"Emeric",
    //     "lastName":"Hoerner",
    //     "nickName":"Mick",
    //     "credit": 100.00
    // }
};

export default function orderReducer(prevState = orderInitialState, action: OrderAction) {
    switch (action.type) {
        case OrderActionType.INIT_ORDER:
            return { ...prevState, name: action.name, user: action.user, items: [] } as Order;

        case OrderActionType.RESET_ORDER:
            return { ...prevState, items: [] } as Order;

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
                    quantity: 1,
                    ingredients: action.ingredients
                });
            }

            return { ...prevState, items: [ ...items ] } as Order;
        }

        case OrderActionType.REMOVE_ITEM_FROM_ORDER: {
            const { items } = prevState;
            const newItems = items.filter(item => item.productId !== action.productId);

            return { ...prevState, items: newItems } as Order;
        }

        case OrderActionType.CREDIT_ORDER_USER:
            return { ...prevState, user: { ...prevState.user, credit: action.credit } } as Order;

        case OrderActionType.CLEAR_ORDER:
            return { name: '', items: [] } as Order;
            
        default:
            return prevState;
    }
}
