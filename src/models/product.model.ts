import { Ingredient } from './ingredient.model';

export interface Product {
    id: string;
    name: string;
    category: string;
    price?: number;
    quantity: number;
    image?: string;
    ingredients: Ingredient[]
}

export interface ProductCategory {
    name: string;
    icon: string;
    color: string;
}

export interface ProductResponse {
    id: string;
    name: string;
    category: string;
    price?: number;
    quantity: number;
    image?: string;
    ingredients: Ingredient[]
}

export class ProductRequest {

    constructor(
        public name: string,
        public category: string,
        public ingredients: string[],
        public isOriginal: boolean,
        public image?: string,
        public price?: number,
        public id?: string
    ) {}

}

export enum Category {

    CUSTOM = "CUSTOM",
    CHAUD = "CHAUD",
    FROID = "FROID",
    BOISSON = "BOISSON",
    DESSERT = "DESSERT"
}

export const categoryMapping = [
    { value: Category.CUSTOM, label: 'Custom' },
    { value: Category.CHAUD, label: 'Chaud' },
    { value: Category.FROID, label: 'Froid' },
    { value: Category.BOISSON, label: 'Boisson' },
    { value: Category.DESSERT, label: 'Dessert' }
];
