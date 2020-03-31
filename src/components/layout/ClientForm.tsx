import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { User, UserResponse, UserSearchEntry } from '../../models/user.model';
import { sectionMapping } from '../../models/section.model';
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
import authenticationService from '../../services/authentication.service';

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
    const { isModalOpened: isImportUserModalOpened, toggleModal: toggleImportUserModal } = useModal();
    const [isAdministratorCreation, setIsAdministratorCreation] = useState(false);
    const [isSavedClicked, setSavedClicked] = useState(false);

    useEffect(() => {
        if (props.selectedUser) setSavedClicked(false);
    }, [props.selectedUser]);

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

    const importCsvUser = useCallback((file: any) => {
        return userService.importUser(file)
            .then(r => createToast('success', `Utilisateurs importés`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const exportCsvUser = useCallback(() => {
        return userService.exportUser()
            .then(r => createToast('success', `Utilisateurs exportés`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

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
            nickName: !props.selectedUser ? '' : props.selectedUser.nickName,
            credit: !props.selectedUser ? 0 : props.selectedUser.credit,
            section: !props.selectedUser ? undefined : props.selectedUser.section,
            membership: true,
            email: !props.selectedUser ? '' : props.selectedUser.email ? props.selectedUser.email : '',
            password: '',
            passwordConfirmation: ''
        },
        onSubmit: values => {
            if (!isSavedClicked) {
                if (values.section) {
                    setSavedClicked(true);
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
                } else {
                    createToast('error', "L'anée est obligatoire");
                }
            }
        },
        enableReinitialize: true
    });

    const importCsv = useFormik({
        initialValues: {
            file: undefined
        },
        onSubmit: values => {
            console.log('import csv')
            importCsvUser(values.file);
        }
    });

    return (

        <div className="user-form">
            <h3>{props.selectedUser ? "Mettre à jour un utilisateur" : "Création"}</h3>
            <div className="line">
                {!isAdministratorCreation && !props.selectedUser && authenticationService.getConnectedUser().isAdmin && <button
                    type="button"
                    onClick={() => setIsAdministratorCreation(true)}>Créer un Respons' Bar</button>
                }
                {!props.selectedUser && isAdministratorCreation && authenticationService.getConnectedUser().isAdmin && <button
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
                            defaultValue=""
                            required>
                            <option value="" disabled hidden>Choisir ici</option>
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
                        {!isSavedClicked && <button
                            type="submit">Enregistrer</button>
                        }

                        {isSavedClicked && <button
                            className="disabled"
                            type="submit"
                            disabled>Enregistrer</button>
                        }

                        {props.selectedUser && authenticationService.getConnectedUser().isAdmin && <button
                            type="button"
                            onClick={toggleModal}>Supprimer</button>
                        }

                        {props.selectedUser && <button
                            type="button"
                            onClick={() => props.selectedUser && openCreditModal(props.selectedUser)}>Créditer</button>
                        }

                        {props.selectedUser && !props.selectedUser?.barman && authenticationService.getConnectedUser().isAdmin && <button
                            type="button"
                            onClick={() => toggleAccountModal()}>Créer le compte </button>
                        }
                        {props.selectedUser?.barman && authenticationService.getConnectedUser().isAdmin && <button
                            type="button"
                            onClick={() => toggleAccountModal()}>Mettre à jour le compte</button>
                        }
                    </div>

                </form>
                }
                <div className="user-form-button-new">
                    {
                        (props.selectedUser || isSavedClicked) && <button
                            type="button"
                            onClick={() => {
                                props.resetUser();
                                formik.resetForm();
                                setSavedClicked(false);
                            }}>Nouveau</button>
                    }
                    {
                        authenticationService.getConnectedUser().isAdmin && <button
                            type="button"
                            onClick={() => toggleImportUserModal()}>Importer/Exporter</button>
                    }
                </div>
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
                {
                    isImportUserModalOpened && authenticationService.getConnectedUser().isAdmin && <Modal
                        title={`Importer/exporter des utilisateurs`}
                        close={toggleImportUserModal}>
                        <form
                            className="user-form"
                            onSubmit={importCsv.handleSubmit}>
                            <div className="line">
                                <label>Importer des utilisateurs <i>(Les utilisateurs existant ne seront pas remplacés)</i> : </label><br />
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(event) => {
                                        if (event.currentTarget.files) {
                                            if (event.currentTarget.files[0].type === 'text/csv') {
                                                importCsv.setFieldValue("file", event.currentTarget.files[0]);
                                            } else {
                                                createToast('error', "format *.csv obligatoire")
                                            }
                                        }
                                    }}
                                />
                                
                                <i>format *.csv obligatoire</i>
                            </div>
                            <div className="line">
                                <button type="submit"
                                    className="primary">Importer</button>
                                <button type="button"
                                    onClick={() => exportCsvUser()}
                                    className="primary">Exporter</button>
                            </div>
                        </form>
                    </Modal>
                }
            </div>
        </div >
    );
}

export default ClientForm;
