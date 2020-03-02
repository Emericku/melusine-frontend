import React, { FunctionComponent, useCallback } from 'react';
import { useFormik } from 'formik';
import { Ingredient, IngredientType, ingredientTypeMapping } from '../../models/ingredient.model';
import ingredientService from '../../services/ingredient.service';
import { useToast, useModal } from '../../hooks';
import './IngredientForm.scss';
import Modal from '../misc/Modal';

interface IngredientFormProps {
    selectedIngredient?: Ingredient;
    resetIngredient: () => void;
    refreshIngredients: () => void;
}

const IngredientForm: FunctionComponent<IngredientFormProps> = (props) => {
    const createToast = useToast();
    const { isModalOpened, toggleModal } = useModal();

    const addIngredient = useCallback((ingredient: Ingredient) => {
        return ingredientService.createIngredient(ingredient)
            .then(ingredient => createToast('success', `Ingredient ${ingredient.name} créé`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const updateIngredient = useCallback((ingredient: Ingredient) => {
        return ingredientService.updateIngredient(ingredient)
            .then(ingredient => createToast('success', `Ingredient ${ingredient.name} mis à jour`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const deleteIngredient = useCallback((ingredient?: Ingredient) => {
        if (ingredient !== undefined && ingredient.id !== undefined) {
            ingredientService.deleteIngredient(ingredient.id)
                .then(r => {
                    createToast('success', `Ingredient ${ingredient.name} supprimé`);
                    toggleModal();
                })
                .catch(e => createToast('error', e.response ? e.response.data.message : ""));
        }
    }, [createToast, toggleModal])

    function toBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
                    if ((encoded.length % 4) > 0) {
                        encoded += '='.repeat(4 - (encoded.length % 4));
                    }
                    resolve(encoded);
                }
            };
            reader.onerror = error => reject(error);
        });
    }

    const formik = useFormik({
        initialValues: {
            name: !props.selectedIngredient ? '' : props.selectedIngredient.name,
            price: !props.selectedIngredient ? 0 : props.selectedIngredient.price,
            quantity: !props.selectedIngredient ? 0 : props.selectedIngredient.quantity,
            type: !props.selectedIngredient ? IngredientType.BASE : props.selectedIngredient.type,
            image: !props.selectedIngredient ? undefined : props.selectedIngredient.image
        },
        onSubmit: values => {
            const ingredientToSave: Ingredient = {
                id: props.selectedIngredient ? props.selectedIngredient.id : '',
                name: values.name,
                price: values.price,
                type: values.type,
                quantity: values.quantity,
                image: values.image
            }

            const save = ingredientToSave.id ? updateIngredient(ingredientToSave) : addIngredient(ingredientToSave);

            save.then(() => {
                props.refreshIngredients()
                formik.resetForm();
            });
        },
        enableReinitialize: true
    });

    return (
        <div className="ingredient-form">
            <h3>{props.selectedIngredient ? "Mettre à jour un ingrédient" : "Créer un ingrédient"}</h3>
            <div className="ingredient-form">
                <form onSubmit={formik.handleSubmit}>
                    <div className="line">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nom"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required />
                    </div>
                    <div className="line">
                        <label>Catégorie(s)</label>
                        <select
                            id="type"
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            name="type"
                            required>
                            {
                                ingredientTypeMapping.map(type =><option key={type.value} value={type.value}>{type.label}</option>)
                            }
                        </select>
                    </div>

                    <div className="line">
                        <label>Prix :</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Prix"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            min={0.00}
                            max={10000.00}
                            step={0.01}
                            required />€
                    </div>
                    <div className="line">
                        <label>Quantité :</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            placeholder="Quantité"
                            onChange={formik.handleChange}
                            value={formik.values.quantity}
                        />
                    </div>
                    <div className="line">
                        <label>Image :</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(event) => {
                                if (event.currentTarget.files) {
                                    const file = event.currentTarget.files[0];
                                    if (file.type === 'image/svg+xml') {
                                        toBase64(event.currentTarget.files[0])
                                            .then(b64 => formik.setFieldValue("image", b64))
                                            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
                                    } else {
                                        createToast('error', "format *.svg obligatoire")
                                    }
                                }
                            }}
                        />
                        <i>format *.svg obligatoire</i>

                        {
                            formik.values.image && < img src={`data:image/svg+xml;base64, ${formik.values.image}`} alt={formik.values.name} />
                        }
                    </div>

                    <div className="line">
                        <button
                            type="submit">Enregistrer</button>
                        <button
                            type="button"
                            hidden={props.selectedIngredient === undefined}
                            onClick={toggleModal}>Supprimer</button>
                    </div>
                    {
                        props.selectedIngredient && <button
                            className="ingredient-form-button-new"
                            type="button"
                            onClick={props.resetIngredient}>Nouveau</button>
                    }
                </form>
                {
                    (isModalOpened && props.selectedIngredient !== undefined) && <Modal title={`Voulez-vous supprimer ${props.selectedIngredient.name} des ingrédients ?`} close={toggleModal}>
                        <div className="line">
                            <button
                                type="button"
                                hidden={props.selectedIngredient === undefined}
                                onClick={() => deleteIngredient(props.selectedIngredient)}>Oui</button>
                            <button
                                type="button"
                                hidden={props.selectedIngredient === undefined}
                                onClick={() => toggleModal}>Non</button>
                        </div>
                    </Modal>
                }
            </div>
        </div>
    );
}

export default IngredientForm;
