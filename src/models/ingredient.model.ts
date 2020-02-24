export interface Ingredient {
    id: string;
    type: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface CategorizedIngredients {
    [key: string]: Ingredient[]
}
