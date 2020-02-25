import axios from "axios";
import config from "../config";
import { OrderRequest, OrderResponse, OrderItemResponse, OrderItemStatus } from "../models/order.model";
import { PageRequest } from "../models/page.model";
import { Page } from "../models/page.model";

class OrderService {

    async createOrder(request: OrderRequest): Promise<OrderResponse> {
        const { data: order } = await axios.post<OrderResponse>(`${config.backendUrl}/orders`, request);
        return order;
    }

    async getOrderItems(request: PageRequest): Promise<Page<OrderItemResponse>> {
        const { data: page } = await axios.get<Page<OrderItemResponse>>(`${config.backendUrl}/orders/items${request}`);
        return page;
    }

    updateOrderItemStatus(orderItemId: string, status: OrderItemStatus): Promise<void> {
        return axios.post(`${config.backendUrl}/orders/items/${orderItemId}`, {
            status
        });
    }

}

export default new OrderService();
