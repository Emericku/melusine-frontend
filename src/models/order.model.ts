import { UserSearchEntry } from "./user.model";

interface OrderItem {
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
