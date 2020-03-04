import React, { FunctionComponent, useCallback } from 'react';
import { UserResponse } from '../../models/user.model';
import { useToast } from '../../hooks';
import accountService from '../../services/account.service';
import { useFormik } from 'formik';
import { AccountRequest } from '../../models/account.model';
import './CreateAccount.scss'

interface CreateAccountProps {
    user: UserResponse;
}

const CreateAccount: FunctionComponent<CreateAccountProps> = (props) => {
    const createToast = useToast();

    const updateAccount = useCallback((account: AccountRequest) => {
        return accountService.updateAccount(account)
            .then(account => createToast('success', `Compte ${account.email} mis à jour`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const addAccount = useCallback((request: AccountRequest) => {
        return accountService.createAccount(request)
            .then(account => createToast('success', `Compte ${account.email} crée`))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast]);

    const formik = useFormik({
        initialValues: {
            email: props.user.email ? props.user.email : undefined,
            password: undefined,
            passwordConfirmation: undefined
        },
        onSubmit: values => {
            console.log(values)
            const accountToSave: AccountRequest = {
                clientId: props.user.id,
                email: values.email,
                password: values.password,
                isBarman: true
            };

            if (values.password !== values.passwordConfirmation) {
                createToast('error', "Les mot de passe ne sont pas identique")
                return;
            }
            else {
                const save = props.user.email ? updateAccount(accountToSave) : addAccount(accountToSave);
                save.then(() => {
                    formik.resetForm();
                });
            }
        },
        enableReinitialize: true
    });

    return (
        <div className="account-form">
            <form onSubmit={formik.handleSubmit}>
                <div className="line">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required />
                </div>
                <div className="line">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required />
                </div>
                <div className="line">
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Confirmation"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation}
                        required />
                </div>
                <div
                    className="line">
                    <button type="submit">Enregistrer</button>
                </div>

            </form>

        </div>

    );
}
export default CreateAccount;
