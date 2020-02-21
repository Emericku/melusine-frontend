import { UserSearchEntry } from "./userSearchEntry.model";

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
