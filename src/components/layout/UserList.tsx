import React, { FunctionComponent } from 'react';
import User from '../../models/user.model';
import './UserList.scss';

interface UserListProps {
    users: User[];
}

const UserList: FunctionComponent<UserListProps> = (props) => {
    return (
        <div>
            <h3>Liste de clients</h3>
            <table>
                <thead>
                <tr>
                    <th className="user-last-name">Nom</th>
                    <th className="user-first-name">Prénom</th>
                    <th className="user-nick-name">Surnom</th>
                    <th className="user-section">Catégorie</th>
                    <th className="user-credit">Solde</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.users.map((user, index) => (
                        <tr key={index}>
                            <td className="user-last-name">{user.lastName}</td>
                            <td className="user-first-name">{user.firstName}</td>
                            <td className="user-nick-name">{user.nickName}</td>
                            <td className="user-section">{user.section}</td>
                            <td className="user-credit">{user.credit}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
