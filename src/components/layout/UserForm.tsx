import React, { FunctionComponent } from 'react';
import { useFormik } from 'formik';
import User from '../../models/user.model';
import { Section } from '../../models/section.model';
import './UserForm.scss';

interface UserFormProps {
    addUser: (user: User) => void;
}

const UserForm: FunctionComponent<UserFormProps> = (props) => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            credit: 30,
            section: Section.UN
        },
        onSubmit: values => {
            const newUser: User = {
                firstName: values.firstName,
                lastName: values.lastName,
                nickName: values.nickName,
                credit: values.credit,
                section: values.section,
                isMembership: false
            }
            console.log('newUser', newUser);
            props.addUser(newUser);
        },
    });

    return (
        <div>
            <h3>Ajouts de clients</h3>
            <div className="user-form">
                <form onSubmit={formik.handleSubmit}>
                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Prénom"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            required />
                    </div>
                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Nom"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            required />
                    </div>
                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="nickName"
                            name="nickName"
                            type="text"
                            placeholder="Surnom"
                            onChange={formik.handleChange}
                            value={formik.values.nickName}
                        />
                    </div>
                    <div className="user-form-line">
                        <select className="user-form-input"
                            onChange={formik.handleChange}
                            value={formik.values.section}
                            placeholder="Année"
                            required>
                            <option key={0}>1A</option>
                            <option key={1}>2A</option>
                            <option key={2}>3A</option>
                            <option key={3}>4A</option>
                            <option key={4}>5A</option>
                            <option key={5}>EXTERNE</option>
                        </select>
                    </div>

                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="credit"
                            name="credit"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Solde"
                            onChange={formik.handleChange}
                            value={formik.values.credit}
                            required />
                    </div>

                    <div className="user-form-line">
                        <button
                            className="user-form-button"
                            type="submit">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
