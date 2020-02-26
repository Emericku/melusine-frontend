import { UserSearchEntry } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';

export enum OrderActionType {
    INIT_ORDER = 'INIT_ORDER',
    RESET_ORDER = 'RESET_ORDER',
    ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER',
    REMOVE_ITEM_FROM_ORDER = 'REMOVE_ITEM_FROM_ORDER',
    CREDIT_ORDER_USER = 'CREDIT_ORDER_USER',
    CLEAR_ORDER = 'CLEAR_ORDER'
};

export type OrderAction =
    { type: OrderActionType.INIT_ORDER, name: string, user?: UserSearchEntry } |
    { type: OrderActionType.RESET_ORDER } |
    { type: OrderActionType.ADD_ITEM_TO_ORDER, productId: string, name: string, price: number, ingredients: Ingredient[] } |
    { type: OrderActionType.REMOVE_ITEM_FROM_ORDER, productId: string } |
    { type: OrderActionType.CREDIT_ORDER_USER, credit: number } |
    { type: OrderActionType.CLEAR_ORDER };

export const initOrder = (name: string, user?: UserSearchEntry): OrderAction => ({
    type: OrderActionType.INIT_ORDER,
    name,
    user
});

export const addItemToOrder = (productId: string, name: string, price: number, ingredients: Ingredient[]): OrderAction => ({
    type: OrderActionType.ADD_ITEM_TO_ORDER,
    productId,
    name,
    price,
    ingredients
});

export const removeItemFromOrder = (productId: string): OrderAction => ({
    type: OrderActionType.REMOVE_ITEM_FROM_ORDER,
    productId,
});

export const resetOrder = (): OrderAction => ({
    type: OrderActionType.RESET_ORDER
});

export const creditOrderUser = (credit: number): OrderAction => ({
    type: OrderActionType.CREDIT_ORDER_USER,
    credit
});

export const clearOrder = (): OrderAction => ({
    type: OrderActionType.CLEAR_ORDER
});
