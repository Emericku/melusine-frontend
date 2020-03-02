export interface Ingredient {
    id: string;
    type: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface CategorizedIngredients {
    [key: string]: Ingredient[]
}

export enum IngredientType {
    BASE = "BASE",
    SAUCE = "SAUCE",
    VIANDE = "VIANDE",
    SUPPLEMENT = "SUPPLEMENT",
    FROMAGE = "FROMAGE",
    UNIQUE = "UNIQUE"
}

export const ingredientTypeMapping = [
    { value: IngredientType.BASE, label: 'Base' },
    { value: IngredientType.SAUCE, label: 'Sauce' },
    { value: IngredientType.VIANDE, label: 'Viande' },
    { value: IngredientType.SUPPLEMENT, label: 'Supplément' },
    { value: IngredientType.FROMAGE, label: 'Fromage' },
    { value: IngredientType.UNIQUE, label: 'Unique' },
];
