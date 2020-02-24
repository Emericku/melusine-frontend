import axios from "axios";
import config from "../config";
import { OrderRequest, OrderResponse } from "../models/order.model";

class OrderService {

    async createOrder(request: OrderRequest): Promise<OrderResponse> {
        const { data: order } = await axios.post<OrderResponse>(`${config.backendUrl}/orders`, request);
        return order;
    }

}

export default new OrderService();
