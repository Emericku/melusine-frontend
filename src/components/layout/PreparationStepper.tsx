import React, { FunctionComponent, useEffect, useState, useCallback, useMemo } from 'react';
import { useToast } from '../../hooks';
import { Product, ProductRequest } from '../../models/product.model';
import { priceFormatter } from '../../utils';
import { Ingredient, CategorizedIngredients } from '../../models/ingredient.model';
import ingredientService from '../../services/ingredient.service';
import productService from '../../services/product.service';

import './PreparationStepper.scss';
import Spinner from '../misc/Spinner';

interface PreparationStepperProps {
    originalProduct: Product;
    addItem: (product: Product) => void
}

const PreparationStepper: FunctionComponent<PreparationStepperProps> = ({ originalProduct, addItem }) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ ingredients, setIngredients ] = useState<CategorizedIngredients>({});
    const [ currentType, setCurrentType ] = useState('');
    const [ preparation, setPreparation ] = useState<Ingredient[]>([]);
    const createToast = useToast();

    useEffect(() => {
        setLoading(true);

        ingredientService.findAll()
            .then(response => {
                const categorizedIngredients = response.reduce((acc: CategorizedIngredients, current: Ingredient) => {
                    if (acc[current.type]) {
                        acc[current.type].push(current);
                    } else {
                        acc[current.type] = [ current ];
                    }

                    return acc;
                }, {});

                setIngredients(categorizedIngredients);
                setCurrentType(Object.keys(categorizedIngredients)[0]);
            })
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"))
            .finally(() => setLoading(false));
    }, [ createToast ]);

    const goToStep = useCallback((ingredientType: string) => () => {
        setCurrentType(ingredientType);
    }, []);

    const isInPreparation = useCallback((ingredient: Ingredient) => {
        return preparation.includes(ingredient);
    }, [ preparation ]);

    const addOrRemoveFromPreparation = useCallback((ingredient: Ingredient) => () => {
        if (ingredient.quantity === 0) {
            return;
        }

        if (isInPreparation(ingredient)) {
            setPreparation(preparation.filter(ing => ing.id !== ingredient.id));
        } else {
            setPreparation([ ...preparation, ingredient ]);
        }
    }, [ isInPreparation, preparation ]);

    const createProduct = useCallback(async () => {
        const request = new ProductRequest(
            `${originalProduct.name} ${Date.now()}`,
            originalProduct.category,
            preparation.map(({ id }) => id),
            false
        );

        try {
            const product = await productService.createProduct(request);
            product.name = `${originalProduct.name} ${product.ingredients.map(({ name }) => name).join(' - ')}`;
            addItem(product);
        } catch (e) {
            createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
        }
    }, [ originalProduct, preparation, addItem, createToast ]);

    const ingredientTypes = useMemo(() => {
        return Object.keys(ingredients)
    }, [ ingredients ]);
    
    const total = useMemo(
        () => preparation.reduce((acc, { price }) => acc + price, 0), 
        [ preparation ]
    );

    useEffect(() => {
        if (ingredientTypes.length > 0 && !preparation.some(ingredient => ingredient.type === 'BASE')) {
            const allBases = ingredients['BASE'];
    
            if (allBases.length > 0) {
                addOrRemoveFromPreparation(allBases[0])();
            }
        }
    }, [ ingredientTypes, preparation, ingredients, addOrRemoveFromPreparation ]);

    return (
        isLoading ? 
            <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}><Spinner /></div> :
            <div className="preparation-stepper">
                <header>
                    <h5 className="primary">{currentType.toLowerCase()}</h5>

                    <nav>{
                        ingredientTypes.map((ingredientType, index, { length: last }) => (
                            <React.Fragment key={index}>
                                <div
                                    className={`preparation-stepper-step${ingredientType === currentType ? ' current' : ''}`}
                                    onClick={goToStep(ingredientType)}
                                >
                                    <img src={`/assets/icons/${ingredientType.toLowerCase()}.svg`} alt={ingredientType.toLowerCase()} />
                                </div>
                                {index < last - 1 && <div className="preparation-stepper-link" />}
                            </React.Fragment>
                        ))
                    }</nav>
                </header>

                <div className="preparation-stepper-total">Total: {priceFormatter.format(total)}</div>

                <main>{
                    currentType.length > 0 && ingredients[currentType].map(ingredient => ((
                        <div 
                            key={ingredient.id} 
                            className={`ingredient-item${ingredient.quantity === 0 ? ' empty': ''}${isInPreparation(ingredient) ? ' added': ''}`}
                            onClick={addOrRemoveFromPreparation(ingredient)}
                        >
                            <img className="ingredient-item-icon" src={`data:image/svg+xml;base64, ${ingredient.image}`} alt={ingredient.name} />
                            <div className="ingredient-item-name">{ingredient.name}</div>
                            <strong>{priceFormatter.format(ingredient.price)}</strong>
                        </div>
                    )))
                }</main>

                <footer className="columns space-around">
                    {
                        ingredientTypes.indexOf(currentType) > 0 && <button
                            className="secondary columns space-button-reverse"
                            type="button"
                            onClick={goToStep(ingredientTypes[ingredientTypes.indexOf(currentType) - 1])}
                        >
                            <span><img width="10em" src="/assets/icons/chevron.svg" alt="Previous" /></span>
                            <span>Précédent</span>
                        </button>
                    }

                    {
                        ingredientTypes.indexOf(currentType) < ingredientTypes.length - 1 && <button
                            className="primary columns space-button"
                            type="button"
                            onClick={goToStep(ingredientTypes[ingredientTypes.indexOf(currentType) + 1])}
                        >
                            <span>Suivant</span>
                            <span><img className="mirror brighten" width="10em" src="/assets/icons/chevron.svg" alt="Next" /></span>
                        </button>
                    }

                    {
                        ingredientTypes.indexOf(currentType) === ingredientTypes.length - 1 && <button
                            className="primary columns space-button"
                            type="button"
                            onClick={createProduct}
                            disabled={preparation.length === 0}
                        >
                            <span>Valider</span>
                            <span><img width="20em" src="/assets/icons/left-arrow.svg" alt="Next" /></span>
                        </button>
                    }
                </footer>
            </div>
    );
};

export default PreparationStepper;
