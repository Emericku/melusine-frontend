import axios from "axios";
import config from "../config";
import { Ingredient } from "../models/ingredient.model";

class IngredientService {

    async findAll(): Promise<Ingredient[]> {
        const { data: ingredients } = await axios.get<Ingredient[]>(`${config.backendUrl}/ingredients`);
        return ingredients;
    }

    async createIngredient(request: Ingredient): Promise<Ingredient> {
        const { data: ingredient } = await axios.post<Ingredient>(`${config.backendUrl}/ingredients`, request);
        return ingredient;
    }

    /**
     * Get ingredients without unique ingredient.
     */
    async getIngredients() : Promise<Ingredient[]> {
        const { data: ingredient } = await axios.get<Ingredient[]>(`${config.backendUrl}/ingredients`);
        return ingredient;
    };

    /**
     * Get ingredients with unique ingredient.
     */
    async getAllIngredients() : Promise<Ingredient[]> {
        const { data: ingredient } = await axios.get<Ingredient[]>(`${config.backendUrl}/ingredients/all`);
        return ingredient;
    };

    async updateIngredient(ingredientRequest: Ingredient) : Promise<Ingredient> {
        const { data : ingredient} = await axios.put<Ingredient>(`${config.backendUrl}/ingredients/${ingredientRequest.id}`, ingredientRequest);
        return ingredient;
    }

    async deleteIngredient(id: string) : Promise<void> {
        await axios.delete(`${config.backendUrl}/ingredients/${id}`);
    }

}

export default new IngredientService();
