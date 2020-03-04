import React, { FunctionComponent, FormEvent } from 'react';
import { UserResponse } from '../../models/user.model';

import './ClientList.scss';
import { sectionMapping } from '../../models/section.model';
import { priceFormatter } from '../../utils';

interface ClientListProps {
    users: UserResponse[];
    selectUser: (user: UserResponse) => void;
    searchUser: (event: FormEvent<HTMLInputElement>) => void;
    searchText: string;
}

const ClientList: FunctionComponent<ClientListProps> = (props) => {
    return (
        <div className="user-list">
            <div className="user-search-list">
                <input
                    type="search"
                    onChange={props.searchUser}
                    value={props.searchText}
                    placeholder="Rechercher un client"
                />
            </div>
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
