import React, { FunctionComponent, useCallback, useState, useEffect, FormEvent } from 'react';
import { FieldArray, Formik, FieldArrayRenderProps } from 'formik';
import { Product, ProductRequest, categoryMapping } from '../../models/product.model';
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
    const [isSavedClicked, setSavedClicked] = useState(false);

    const refreshIngredients = useCallback(() => {
        ingredientService.getAllIngredients()
            .then(response => setIngredients(response))
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"));
    }, [createToast])

    useEffect(() => {
        refreshIngredients();
        if (props.selectedProduct) setSavedClicked(false);
    }, [refreshIngredients, props.selectedProduct]);

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
        <div className="product-form">
            <h3>{props.selectedProduct ? "Mettre à jour un produit" : "Créer un produit"}</h3>
            <Formik
                initialValues={{
                    name: !props.selectedProduct ? '' : props.selectedProduct.name,
                    price: !props.selectedProduct ? 0 : props.selectedProduct.price,
                    category: !props.selectedProduct ? undefined : props.selectedProduct.category,
                    image: !props.selectedProduct ? '' : props.selectedProduct.image,
                    ingredients: !props.selectedProduct ? [] : props.selectedProduct.ingredients
                }}
                onSubmit={(values) => {
                    if (!isSavedClicked) {
                        if (values.category) {
                            setSavedClicked(true);
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
                        } else {
                            createToast('error', "La catégorie est obligatoire");
                        }
                    }
                }}
                enableReinitialize={true}
                render={({ values, handleChange, handleSubmit, setFieldValue, resetForm }) => (
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
                                <label>Catégorie</label>
                                <select
                                    id="category"
                                    onChange={handleChange}
                                    value={values.category}
                                    required
                                    defaultValue="">
                                    <option value="" disabled hidden>Choisir ici</option>
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
                                    <div>
                                        <div className="line">
                                            <label>Ingrédients :</label>
                                            <select
                                                onChange={onIngredientSelect(ingredientsOfProduct)}
                                                defaultValue="">
                                                <option value="" disabled hidden>Choisir ici</option>
                                                {
                                                    ingredients.map(i => <option key={i.id} value={i.name}> {i.name} </option>)
                                                }</select>
                                        </div>
                                        <div className="line">
                                            <label className="line">Ingrédient(s) :</label>
                                            {values.ingredients && values.ingredients.length > 0 ? (
                                                values.ingredients.map((ingredient, index) => (
                                                    <ul className="column"
                                                        key={index}>
                                                        <span>{ingredient.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => ingredientsOfProduct.remove(index)}>
                                                            X
                                                        </button>
                                                    </ul>
                                                ))
                                            ) : (<i>Aucun ingrédient lié au produit</i>)}
                                        </div>

                                        <div className="line">
                                            <label>Image : </label><br />
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                onChange={(event) => {
                                                    if (event.currentTarget.files) {
                                                        if (event.currentTarget.files[0].type === 'image/png') {
                                                            toBase64(event.currentTarget.files[0])
                                                                .then(b64 => setFieldValue("image", b64));
                                                        } else {
                                                            createToast('error', "format *.png obligatoire")
                                                        }
                                                    }
                                                }}
                                            />
                                            {
                                                values.image && <img className="image"
                                                    src={`data:image/png;base64, ${values.image}`} alt={values.name} />
                                            }
                                            <i>format *.png obligatoire</i>
                                        </div>
                                    </div>
                                )}
                            />

                            <div className="line">
                                {!isSavedClicked && <button
                                    type="submit">Enregistrer</button>
                                }

                                { isSavedClicked && <button
                                    className="disabled"
                                    type="submit"
                                    disabled>Enregistrer</button>
                                }
                                <button
                                    type="button"
                                    hidden={props.selectedProduct === undefined}
                                    onClick={toggleModal}>Supprimer</button>
                            </div>
                            {
                                (props.selectedProduct || isSavedClicked) && <button
                                    className="product-form-button-new"
                                    type="button"
                                    onClick={() => {
                                        props.resetProduct();
                                        resetForm();
                                        setSavedClicked(false);
                                    }}
                                >Nouveau</button>
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