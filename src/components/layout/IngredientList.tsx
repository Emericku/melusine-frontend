import React, { FunctionComponent } from 'react';
import {Ingredient, ingredientTypeMapping} from '../../models/ingredient.model';
import './IngredientList.scss';
import { priceFormatter } from '../../utils';

interface IngredientListProps {
    ingredients: Ingredient[];
    selectIngredient: (ingredient: Ingredient) => void;
}

const IngredientList: FunctionComponent<IngredientListProps> = (props) => {
    return (
        <div>
            <h3>Liste d'ingrédients</h3>
            <table>
                <thead>
                <tr>
                    <th className="ingredient-last-name">Nom</th>
                    <th className="ingredient-first-name">Prix</th>
                    <th className="ingredient-section">Catégorie</th>
                    <th className="ingredient-credit">Quantité</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.ingredients.map((ingredient, index) => (
                        <tr key={index} onClick={() => props.selectIngredient(ingredient)}>
                            <td className="ingredient-last-name">{ingredient.name}</td>
                            <td className="ingredient-first-name">{priceFormatter.format(ingredient.price)}</td>
                            <td className="ingredient-section">{
                            ingredientTypeMapping.find((s) => s.value===ingredient.type)?.label
                            }</td>
                            <td className="ingredient-credit">{ingredient.quantity}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default IngredientList;
