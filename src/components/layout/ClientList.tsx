import React, { FunctionComponent } from 'react';
import { UserResponse, User } from '../../models/user.model';

import './ClientList.scss';
import { sectionMapping } from '../../models/section.model';
import { priceFormatter } from '../../utils';

interface ClientListProps {
    users: UserResponse[];
    selectUser: (user: User) => void;
}

const ClientList: FunctionComponent<ClientListProps> = (props) => {
    return (
        <div className="user-list">
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
                            <tr key={index} onClick={() => props.selectUser(user)}>
                                <td className="user-last-name">{user.lastName}</td>
                                <td className="user-first-name">{user.firstName}</td>
                                <td className="user-nick-name">{user.nickName}</td>
                                <td className="user-section">
                                    {
                                        sectionMapping.find((s) => s.value === user.section)?.label
                                    }
                                </td>
                                <td className="user-credit">{priceFormatter.format(user.credit)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ClientList;
