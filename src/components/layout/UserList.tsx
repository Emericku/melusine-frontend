import React, { FunctionComponent } from 'react';
import User from '../../models/user.model';
import './UserList.scss';

interface UserListProps {
    users : User[];
}

const UserList: FunctionComponent<UserListProps> = (props) => {
    return (
        <div>
            <h3>Liste de clients</h3>
                <div className="user-details user-header">
                    <strong>Prénom</strong>
                    <strong>Nom</strong>
                    <p className="user-nick-name">Surnom</p>
                    <p className="user-section">Catégorie</p>
                    <p className="user-credit">Solde</p>
                </div>
                {
                    props.users.map((user, index) => (
                    <div className="user-details" key={index}>
                        <strong>{user.firstName}</strong>
                        <strong>{user.lastName}</strong>
                        <p className="user-nick-name">{user.nickName}</p>
                        <p className="user-section">{user.section}</p>
                        <p className="user-credit">{user.credit}</p>
                    </div>
                    ))
                }
        </div>
    );
}

export default UserList;
