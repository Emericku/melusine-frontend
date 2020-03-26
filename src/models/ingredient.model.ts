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

export const ingredientDefaultImage = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MS45NTQiIGhlaWdodD0iNDEuOTU0IiB2aWV3Qm94PSIwIDAgNDEuOTU0IDQxLjk1NCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6Izc5NzQ3NTt9PC9zdHlsZT48L2RlZnM+PGNpcmNsZSBjbGFzcz0iYSIgY3g9IjIuMDQ5IiBjeT0iMi4wNDkiIHI9IjIuMDQ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC45MjggMjguOTY2KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjAuOTc3LDBBMjAuOTc3LDIwLjk3NywwLDEsMCw0MS45NTQsMjAuOTc3LDIwLjk2NSwyMC45NjUsMCwwLDAsMjAuOTc3LDBabTAsMzguNjc2YTE3LjcsMTcuNywwLDEsMSwxNy43LTE3LjdBMTcuNjksMTcuNjksMCwwLDEsMjAuOTc3LDM4LjY3NloiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTE4Mi41NTUsMTI4LjVBNi41NjMsNi41NjMsMCwwLDAsMTc2LDEzNS4wNTVhMS42MzksMS42MzksMCwxLDAsMy4yNzgsMCwzLjI3OCwzLjI3OCwwLDEsMSwzLjI3OCwzLjI3OCwxLjYzOSwxLjYzOSwwLDAsMC0xLjYzOSwxLjYzOXY0LjFhMS42MzksMS42MzksMCwxLDAsMy4yNzgsMFYxNDEuNGE2LjU1Niw2LjU1NiwwLDAsMC0xLjYzOS0xMi45WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2MS41NzggLTExNy45NzEpIi8+PC9zdmc+"