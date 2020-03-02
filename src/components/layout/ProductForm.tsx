import React, { FunctionComponent, useCallback, useState, useEffect, FormEvent } from 'react';
import { FieldArray, Formik, FieldArrayRenderProps } from 'formik';
import { Product, ProductRequest, Category, categoryMapping } from '../../models/product.model';
import { Ingredient } from '../../models/ingredient.model';
import productService from '../../services/product.service';
import ingredientService from '../../services/ingredient.service';
import { useToast, useModal } from '../../hooks';
import './ProductForm.scss';
import Modal from '../misc/Modal';

interface ProductFormProps {
    selectedProduct?: Product;
    resetProduct: () => void;
    refreshProducts: () => void;
}

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
    const createToast = useToast();
    const { isModalOpened, toggleModal } = useModal();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const refreshIngredients = useCallback(() => {
        ingredientService.getAllIngredients()
            .then(response => setIngredients(response))
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"));
    }, [createToast])

    useEffect(() => {
        refreshIngredients();

    }, [refreshIngredients]);

    const addProduct = useCallback((product: ProductRequest) => {
        return productService.createProduct(product)
            .then(product => createToast('success', `Produit ${product.name} créé`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const updateProduct = useCallback((product: ProductRequest) => {
        return productService.updateProduct(product)
            .then(product => createToast('success', `Produit ${product.name} mis à jour`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const deleteProduct = useCallback((product?: Product) => {
        if (product !== undefined && product.id !== undefined) {
            productService.deleteProduct(product.id)
                .then(r => {
                    createToast('success', `Produit de ${product.name} supprimé`);
                    toggleModal();
                })
                .catch(e => createToast('error', e.response ? e.response.data.message : ""));
        }
    }, [createToast, toggleModal])

    const onIngredientSelect = useCallback((ingredientsOfProduct: FieldArrayRenderProps) => (e: FormEvent<HTMLSelectElement>) => {
        const nameOfIngredientToAdd = e.currentTarget.value;
        ingredientsOfProduct.push(ingredients.find(i => i.name === nameOfIngredientToAdd));
    }, [ingredients]);

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

    return (
        <div>
            <h3>{props.selectedProduct ? "Mettre à jour un produit" : "Créer un produit"}</h3>
            <Formik
                initialValues={{
                    name: !props.selectedProduct ? '' : props.selectedProduct.name,
                    price: !props.selectedProduct ? undefined : props.selectedProduct.price,
                    category: !props.selectedProduct ? Category.FROID : props.selectedProduct.category,
                    image: !props.selectedProduct ? undefined : props.selectedProduct.image,
                    ingredients: !props.selectedProduct ? [] : props.selectedProduct.ingredients
                }}
                onSubmit={(values) => {
                    const productToSave: ProductRequest = {
                        id: props.selectedProduct ? props.selectedProduct.id : '',
                        name: values.name,
                        price: values.price,
                        category: values.category,
                        image: values.image,
                        ingredients: values.ingredients.map(i => i.id),
                        isOriginal: true
                    }

                    const save = productToSave.id ? updateProduct(productToSave) : addProduct(productToSave);

                    save.then(() => {
                        props.refreshProducts()
                    });
                }}
                enableReinitialize={true}
                render={({ values, handleChange, handleSubmit, setFieldValue }) => (
                    <div className="product-form">
                        <form onSubmit={handleSubmit}>
                            <div className="line">
                                <input

                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nom"
                                    onChange={handleChange}
                                    value={values.name}
                                    required />
                            </div>
                            <div className="line">
                                <label>Catégorie(s)</label>
                                <select
                                    id="category"
                                    onChange={handleChange}
                                    value={values.category}
                                    placeholder="Catégorie"
                                    required >
                                    {
                                        categoryMapping.map((category) => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="line">
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Prix"
                                    onChange={handleChange}
                                    value={values.price}
                                    min={0.00}
                                    step="any"
                                />€
                                {
                                    ((values.price && values.price > 0) || props.selectedProduct?.price) && <i>Attention le prix calculé en fonction des ingrédients sera écrasé</i>
                                }
                            </div>

                            <FieldArray
                                name="ingredients"
                                render={ingredientsOfProduct => (
                                    <div className="line">
                                        <div className="column">
                                            <div className="line column-ingredients">
                                                <label> Ingrédient(s) :</label>
                                                {values.ingredients && values.ingredients.length > 0 ? (
                                                    values.ingredients.map((ingredient, index) => (
                                                        <li
                                                            key={index}>
                                                            <span>{ingredient.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => ingredientsOfProduct.remove(index)}>
                                                                X
                                                        </button>
                                                        </li>
                                                    ))
                                                ) : (<i>Aucun ingrédient lié au produit</i>)}
                                            </div>
                                            <div className="line column-ingredients-selector">
                                                <label>Ajouter un ingrédient :</label>

                                                <select
                                                    onChange={onIngredientSelect(ingredientsOfProduct)}
                                                    defaultValue="">
                                                    <option value="" disabled hidden>Choisir ici</option>
                                                    {
                                                        ingredients.map(i => <option key={i.id} value={i.name}> {i.name} </option>)
                                                    }</select>
                                            </div>
                                        </div>

                                        <div className="line">
                                            <label>Ajouter une image : </label><br />
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                onChange={(event) => {
                                                    console.log('event value', event.currentTarget.files)
                                                    if (event.currentTarget.files) {
                                                        if (event.currentTarget.files[0].type === 'image/png') {
                                                            toBase64(event.currentTarget.files[0])
                                                                .then(b64 => setFieldValue("image", b64));
                                                        }
                                                    }
                                                }}
                                            />
                                            {
                                                values.image && <img className="image"
                                                    src={`data:image/png;base64, ${values.image}`} alt={values.name} />
                                            }
                                        </div>
                                    </div>
                                )}
                            />

                            <div className="line">
                                <button
                                    type="submit">Enregistrer</button>
                                <button
                                    type="button"
                                    hidden={props.selectedProduct === undefined}
                                    onClick={toggleModal}>Supprimer</button>
                            </div>
                            {
                                props.selectedProduct && <button
                                    className="product-form-button-new"
                                    type="button"
                                    onClick={props.resetProduct}>Nouveau</button>
                            }
                        </form>
                    </div>
                )}
            />
            <div>
                {
                    (isModalOpened && props.selectedProduct !== undefined) && <Modal title={`Voulez-vous supprimer ${props.selectedProduct.name} des produits ?`} close={toggleModal}>
                        <div className="line">
                            <button
                                type="button"
                                hidden={props.selectedProduct === undefined}
                                onClick={() => deleteProduct(props.selectedProduct)}>Oui</button>
                            <button
                                type="button"
                                hidden={props.selectedProduct === undefined}
                                onClick={() => toggleModal}>Non</button>
                        </div>
                    </Modal>
                }
            </div>
        </div >
    );
}
export default ProductForm;