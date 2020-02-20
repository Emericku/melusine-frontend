import { UserSearchEntry } from '../models/user.model';

export enum OrderActionType {
    INIT_ORDER = 'INIT_ORDER',
    RESET_ORDER = 'RESET_ORDER',
    ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER',
    REMOVE_ITEM_TO_ORDER = 'REMOVE_ITEM_TO_ORDER' 
};

export type OrderAction =
    { type: OrderActionType.INIT_ORDER, name: string, user?: UserSearchEntry } |
    { type: OrderActionType.RESET_ORDER } |
    { type: OrderActionType.ADD_ITEM_TO_ORDER, productId: string, name: string, price: number } |
    { type: OrderActionType.REMOVE_ITEM_TO_ORDER, productId: string };

export const initOrder = (name: string, user?: UserSearchEntry): OrderAction => ({
    type: OrderActionType.INIT_ORDER,
    name,
    user
});

export const addItemToOrder = (productId: string, name: string, price: number): OrderAction => ({
    type: OrderActionType.ADD_ITEM_TO_ORDER,
    productId,
    name,
    price
});

export const resetOrder = (): OrderAction => ({
    type: OrderActionType.RESET_ORDER
});
