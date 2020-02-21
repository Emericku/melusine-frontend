import { UserSearchEntry } from '../models/userSearchEntry.model';

export enum OrderActionType {
    INIT_ORDER = 'INIT_ORDER',
    RESET_ORDER = 'RESET_ORDER',
    ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER',
    REMOVE_ITEM_TO_ORDER = 'REMOVE_ITEM_TO_ORDER' 
};

export type OrderAction =
    { type: OrderActionType.INIT_ORDER, name: string, user: UserSearchEntry } |
    { type: OrderActionType.RESET_ORDER } |
    { type: OrderActionType.ADD_ITEM_TO_ORDER, productId: string, name: string, price: number } |
    { type: OrderActionType.REMOVE_ITEM_TO_ORDER, productId: string };

export const initOrder = (name: string, user?: UserSearchEntry) => {
    return {
        type: OrderActionType.INIT_ORDER,
        name,
        user
    } as OrderAction;
};

export const addItemToOrder = (productId: string, name: string, price: number) => {
    return {
        type: OrderActionType.ADD_ITEM_TO_ORDER,
        productId,
        name,
        price
    } as OrderAction;
};

export const resetOrder = () => {
    return {
        type: OrderActionType.RESET_ORDER
    } as OrderAction;
};
