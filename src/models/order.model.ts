import { UserSearchEntry } from "./user.model";
import { Ingredient } from "./ingredient.model";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    ingredients: Ingredient[];
}

export interface Order {
    name: string;
    user?: UserSearchEntry;
    items: OrderItem[];
}

export class OrderRequest {

    constructor(
        public items: string[],
        public name: string,
        public userId?: string
    ) {}

}

export interface OrderResponse {
    id: string;
    total: number;
}

export interface OrderItemResponse {
    id: string;
    orderId: string;
    productName: string;
    clientName: string;
    ingredients: string[];
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export enum OrderItemStatus {
    PENDING = 'PENDING',
    DELIVER = 'DELIVER',
    CANCEL = 'CANCEL'
}
