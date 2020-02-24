import { UserSearchEntry } from "./user.model";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    name: string;
    user?: UserSearchEntry;
    items: OrderItem[];
}

export class OrderRequest {

    constructor(
        public items: {
            productId: string;
            quantity: number;
        }[],
        public name: string,
        public userId?: string
    ) {}

}

export interface OrderResponse {
    id: string;
    total: number;
}
