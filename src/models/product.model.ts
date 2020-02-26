import { Ingredient } from "./ingredient.model";

export interface Product {
    id: string;
    name: string;
    category: string;
    price?: number;
    quantity: number;
    image: string;
    ingredients: Ingredient[];
}

export interface ProductCategory {
    name: string;
    icon: string;
    color: string;
}

export class ProductCreationRequest {

    constructor(
        public name: string,
        public category: string,
        public ingredients: string[],
        public isOriginal: boolean,
        public image?: string
    ) {}

}
