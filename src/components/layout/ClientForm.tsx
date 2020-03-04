import React, { FunctionComponent, useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { User, UserResponse, UserSearchEntry } from '../../models/user.model';
import { Section, sectionMapping } from '../../models/section.model';
import userService from '../../services/user.service';
import { useToast, useModal } from '../../hooks';
import './ClientForm.scss';
import { priceFormatter } from '../../utils';
import Modal from '../misc/Modal';
import CreditCharger from './CreditCharger';
import { useAppState } from '../../store';
import { initOrder, resetOrder } from '../../actions/order.actions';
import { AccountRequest } from '../../models/account.model';
import CreateAccount from './CreateAccount';

interface ClientFormProps {
    selectedUser?: UserResponse;
    resetUser: () => void;
    refreshUsers: () => void;
}

const ClientForm: FunctionComponent<ClientFormProps> = (props) => {
    const [, dispatch] = useAppState();
    const createToast = useToast();
    const { isModalOpened, toggleModal } = useModal();
    const { isModalOpened: isCreditModalOpened, toggleModal: toggleCreditModal } = useModal();
    const { isModalOpened: isAccountModalOpened, toggleModal: toggleAccountModal } = useModal();
    const [isAdministratorCreation, setIsAdministratorCreation] = useState(false);


    const addUser = useCallback((user: User) => {
        return userService.createUser(user)
            .then(user => createToast('success', `Compte de ${user.firstName} ${user.lastName} créé solde :${priceFormatter.format(user.credit)}`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const updateUser = useCallback((user: User) => {
        return userService.updateUser(user)
            .then(user => createToast('success', `Compte de ${user.firstName} ${user.lastName} mis à jour`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const deleteUser = useCallback((user?: User) => {
        if (user !== undefined && user.id !== undefined) {
            userService.deleteUser(user.id)
                .then(r => {
                    createToast('success', `Compte de ${user.firstName} ${user.lastName} supprimé`);
                    toggleModal();
                })
                .catch(e => createToast('error', e.response ? e.response.data.message : ""));
        }
    }, [createToast, toggleModal])

    const openCreditModal = useCallback((user: User) => {
        if (user.id) {
            const userSearchEntry: UserSearchEntry = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                nickName: user.nickName,
                credit: user.credit
            }
            dispatch(initOrder(`${user.firstName} ${user.lastName}`, userSearchEntry));
            toggleCreditModal();
        }
    }, [dispatch, toggleCreditModal])

    const closeCreditModal = useCallback(() => {
        dispatch(resetOrder());
        props.refreshUsers();
        toggleCreditModal();
    }, [dispatch, toggleCreditModal, props])

    const formik = useFormik({
        initialValues: {
            firstName: !props.selectedUser ? '' : props.selectedUser.firstName,
            lastName: !props.selectedUser ? '' : props.selectedUser.lastName,
            nickName: !props.selectedUser ? undefined : props.selectedUser.nickName,
            credit: !props.selectedUser ? undefined : props.selectedUser.credit,
            section: !props.selectedUser ? Section.FIRST : props.selectedUser.section,
            membership: true,
            email: !props.selectedUser ? undefined : props.selectedUser.email ? props.selectedUser.email : undefined,
            password: undefined,
            passwordConfirmation: undefined
        },
        onSubmit: values => {
            const accountToSave: AccountRequest = {
                email: values.email,
                password: values.password,
                isBarman: true
            };

            const userToSave: User = {
                id: props.selectedUser ? props.selectedUser.id : undefined,
                firstName: values.firstName,
                lastName: values.lastName,
                nickName: values.nickName,
                credit: values.credit ? values.credit : 0,
                section: values.section,
                membership: true,
                account: (isAdministratorCreation || props.selectedUser?.barman) ? accountToSave : undefined
            }
            if ((isAdministratorCreation || props.selectedUser?.barman) && values.password !== values.passwordConfirmation) {
                createToast('error', "Les mot de passe ne sont pas identique")
                return;
            }
            else {
                const save = userToSave.id ? updateUser(userToSave) : addUser(userToSave);
                save.then(() => {
                    props.refreshUsers()
                    formik.resetForm();
                });
            }
        },
        enableReinitialize: true
    });

    return (

        <div className="user-form">
            <h3>{props.selectedUser ? "Mettre à jour un utilisateur" : "Création"}</h3>
            <div className="line">
                {!isAdministratorCreation && !props.selectedUser && <button
                    type="button"
                    onClick={() => setIsAdministratorCreation(true)}>Créer un Respons' Bar</button>
                }
                {!props.selectedUser && isAdministratorCreation && <button
                    type="button"
                    onClick={() => setIsAdministratorCreation(false)}>Créer un client</button>
                }
            </div>

            <div className="user-form">
                {isAdministratorCreation !== undefined && <form onSubmit={formik.handleSubmit}>
                    {(isAdministratorCreation && !props.selectedUser) && <div className="line">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="E-mail"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required />
                    </div>
                    }
                    {(isAdministratorCreation && !props.selectedUser) && <div className="line">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required />
                    </div>
                    }
                    {(isAdministratorCreation && !props.selectedUser) && <div className="line">
                        <input
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Confirmation"
                            onChange={formik.handleChange}
                            value={formik.values.passwordConfirmation}
                            required />
                    </div>
                    }
                    <div className="line">
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Prénom"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            required />
                    </div>
                    <div className="line">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Nom"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            required />
                    </div>
                    <div className="line">
                        <input
                            id="nickName"
                            name="nickName"
                            type="text"
                            placeholder="Surnom"
                            onChange={formik.handleChange}
                            value={formik.values.nickName}
                        />
                    </div>
                    <div className="line">
                        <label>Promotion</label>
                        <select
                            id="section"
                            onChange={formik.handleChange}
                            value={formik.values.section}
                            placeholder="Année"
                            required>
                            {
                                sectionMapping.map((section) => (
                                    <option key={section.value} value={section.value}>{section.label}</option>
                                ))
                            }
                        </select>
                    </div>

                    {
                        !props.selectedUser && <div className="line">
                            <input
                                id="credit"
                                name="credit"
                                type="number"
                                placeholder="Solde"
                                onChange={formik.handleChange}
                                value={formik.values.credit}
                            />€
                        </div>}

                    <div className="line">
                        <button
                            type="submit">Enregistrer</button>

                        {props.selectedUser && <button
                            type="button"
                            onClick={toggleModal}>Supprimer</button>
                        }

                        {props.selectedUser && <button
                            type="button"
                            onClick={() => props.selectedUser && openCreditModal(props.selectedUser)}>Créditer</button>
                        }

                        {props.selectedUser && !props.selectedUser?.barman && <button
                            type="button"
                            onClick={() => toggleAccountModal()}>Créer le compte </button>
                        }
                        {props.selectedUser?.barman && <button
                            type="button"
                            onClick={() => toggleAccountModal()}>Mettre à jour le compte</button>
                        }
                    </div>
                    {
                        props.selectedUser && <button
                            className="user-form-button-new"
                            type="button"
                            onClick={props.resetUser}>Nouveau</button>
                    }
                </form>
                }
                {
                    (isModalOpened && props.selectedUser) && <Modal title={`Voulez-vous supprimer ${props.selectedUser.firstName} ${props.selectedUser.lastName} des clients ?`} close={toggleModal}>
                        <div
                            className="line">
                            <button
                                type="button"
                                onClick={() => deleteUser(props.selectedUser)}>Oui</button>
                            <button
                                type="button"
                                onClick={() => toggleModal}>Non</button>
                        </div>
                    </Modal>
                }
                {
                    (isCreditModalOpened && props.selectedUser) && <Modal title={`Voulez-vous créditer ${props.selectedUser.firstName} ${props.selectedUser.lastName} ?`} close={closeCreditModal}>
                        <CreditCharger />
                    </Modal>
                }
                {
                    (isAccountModalOpened && props.selectedUser) && <Modal title={`Création de compte pour ${props.selectedUser.firstName} ${props.selectedUser.lastName}`} close={toggleAccountModal}>
                        <CreateAccount user={props.selectedUser} />
                    </Modal>
                }
            </div>
        </div >
    );
}

export default ClientForm;
