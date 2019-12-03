import React, { FunctionComponent, useCallback, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './ClientSearch.scss';

interface User {
    id?: string;
    name: string;
}

const ClientSearch: FunctionComponent = () => {
    const [ user, setUser ] = useState<User>({ name: '' });
    const history = useHistory();

    const beginOrder = useCallback((e: FormEvent) => {
        e.preventDefault();
        
        history.push('/dashboard/order');
    }, [ history ]);

    const searchUser = useCallback((e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        const newUser: User = { name: value };

        if (value.trim().length > 0) {
            newUser.id = 'some-id';
        }

        setUser(newUser);
    }, [ setUser ]);

    return (
        <div className="client-search decorations">
            <h2>Rechercher un client</h2>

            <p>
                Avant de prendre commande, veuillez rechercher le client en complétant le champ ci-dessous. 
                Ajouter le s’il n’existe pas.
            </p>

            <form onSubmit={beginOrder}>
                <div className="client-search-name">
                    <input type="text" placeholder="Nom du client" value={user.name} onChange={searchUser} />
                    { user.id && <div className="client-search-name-validation" /> }
                </div>

                <button className="primary columns" type="submit" disabled={user.name.length === 0}>
                    <span>Passer commande</span>

                    <img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider" />
                </button>
            </form>
        </div>
    );
};

export default ClientSearch;
