import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { Ingredient } from '../../models/ingredient.model';
import ingredientService from '../../services/ingredient.service';
import IngredientList from '../layout/IngredientList';
import IngredientForm from '../layout/IngredientForm';
import './IngredientPage.scss';
import { useToast } from '../../hooks';

const IngredientPage: FunctionComponent = () => {
    const createToast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selctedIngredient, setSelectedIngredient] = useState<Ingredient>();

    const refreshIngredients = useCallback(() => {
        ingredientService.getAllIngredients()
            .then(response => setIngredients(response))
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"))
            .finally(() => setLoading(false));
    }, [createToast])

    useEffect(() => {
            setLoading(true);
            refreshIngredients();
        
    }, [refreshIngredients]);

    const selectIngredient = useCallback((ingredient: Ingredient) => {
        setSelectedIngredient(ingredient)
    }, [])

    const resetIngredient = useCallback(() => {
        setSelectedIngredient(undefined);
    }, []);

    return (
        <div className="ingredient-main">
            <div className="ingredient-list">
                {isLoading ?
                    'Loading ...' :
                        <IngredientList ingredients={ingredients} selectIngredient={selectIngredient} />
                }
            </div>
            <div className="ingredient-form">
                <IngredientForm selectedIngredient={selctedIngredient} resetIngredient={resetIngredient} refreshIngredients={refreshIngredients} />
            </div>
        </div>
    );
}
export default IngredientPage;