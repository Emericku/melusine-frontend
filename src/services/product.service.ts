import { Product, ProductCategory, ProductResponse, ProductRequest } from "../models/product.model";
import axios from "axios";
import config from "../config";

class ProductService {

    async findCategories(): Promise<ProductCategory[]> {
        const { data: categories } = await axios.get<ProductCategory[]>(`${config.backendUrl}/products/categories`);
        return categories;
    }

    async findAll(): Promise<Product[]> {
        const { data: products } = await axios.get<Product[]>(`${config.backendUrl}/products`);
        return products;
    }

    async createProduct(request: ProductRequest): Promise<Product> {
        const { data: product } = await axios.post<Product>(`${config.backendUrl}/products`, request);
        return product;
    }

    async getProducts() : Promise<ProductResponse[]> {
        const { data: product } = await axios.get<ProductResponse[]>(`${config.backendUrl}/products`);
        return product;
    };

    async updateProduct(productRequest: ProductRequest) : Promise<ProductResponse> {
        const { data : product} = await axios.put<ProductResponse>(`${config.backendUrl}/products/${productRequest.id}`, productRequest);
        return product;
    }

    async deleteProduct(id: string) : Promise<void> {
        await axios.delete(`${config.backendUrl}/products/${id}`);
    }

}

export default new ProductService();
