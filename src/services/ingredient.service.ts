import axios from "axios";
import config from "../config";
import { Ingredient } from "../models/ingredient.model";

class IngredientService {

    async findAll(): Promise<Ingredient[]> {
        const { data: ingredients } = await axios.get<Ingredient[]>(`${config.backendUrl}/ingredients`);
        return ingredients;
    }

}

export default new IngredientService();
