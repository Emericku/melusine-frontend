import React, { FunctionComponent } from 'react';
import { useFormik } from 'formik';
import './UserForm.scss';


const UserForm: FunctionComponent = (props) => {

    const formik = useFormik({
        initialValues: {
            firstName: 'Prénom',
            lastName: 'Nom',
            nickName: 'Surnom',
            credit: 'Solde'
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>
                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>
                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="nickName"
                            name="nickName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.nickName}
                        />
                    </div>
                    <div className="user-form-line">
                        <select className="user-form-input">
                            <option>Default select</option>
                        </select>
                    </div>

                    <div className="user-form-line">
                        <input
                            className="user-form-input"
                            id="credit"
                            name="credit"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.credit}
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
