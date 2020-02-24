import { Product, ProductCategory, ProductCreationRequest } from "../models/product.model";
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

    async createProduct(request: ProductCreationRequest): Promise<Product> {
        const { data: product } = await axios.post<Product>(`${config.backendUrl}/products`, request);
        return product;
    }

}

export default new ProductService();
