import React, { FunctionComponent, useCallback, FormEvent, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Typeahead } from '@gforge/react-typeahead-ts';

import './ClientSearch.scss';
import { UserSearchEntry } from '../../models/user.model';
import userService from '../../services/userService';

const ClientSearch: FunctionComponent = () => {
    const history = useHistory();

    const [ results, setResults ] = useState<UserSearchEntry[]>([]);
    const [ selected, setSelected ] = useState<UserSearchEntry | null>(null);
    const autocompleteInput = useRef<HTMLInputElement | undefined>();

    const searchUser = useCallback((e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        if (value.length < 3) {
            return;
        }
        
        userService.findByName(value)
            .then(page => setResults(page.content))
            .catch(e => console.error('Could not retrieve users', e));
    }, [ setResults ]);

    const renderUser = useCallback(({ firstName, lastName, nickName }) => {
        return `${firstName} ${lastName}${nickName ? ` dit ${nickName}` : ''}`;
    }, []);

    const selectUser = useCallback((opt) => {
        setSelected(opt as UserSearchEntry);
    }, [ setSelected ]);

    const userExists = useCallback(() => {
        if (!autocompleteInput.current) {
            return false;
        }

        const { value } = autocompleteInput.current;

        if (value.trim().length < 3) {
            return false;
        }

        return selected && selected.id && renderUser(selected) === value;
    }, [ selected, renderUser ]);

    const startOrder = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (!autocompleteInput.current) {
            return;
        }

        const { value } = autocompleteInput.current;

        if (value.trim().length < 3) {
            return;
        }

        if (selected === null || !userExists()) {
            console.log('User does not exist yet');
        } else {
            console.log('User already exists');
        }
        
        // history.push('/dashboard/order');
    }, [ history, selected, userExists ]);

    return (
        <div className="client-search decorations">
            <h2>Rechercher un client</h2>

            <p>
                Avant de prendre commande, veuillez rechercher le client en complétant le champ ci-dessous. 
                Ajouter le s’il n’existe pas.
            </p>

            <form onSubmit={startOrder}>
                <div className="client-search-name">
                    <Typeahead
                        options={results as any[]} 
                        className="client-search-name-autocomplete"
                        placeholder="Nom du client"
                        filterOption={Boolean}
                        maxVisible={5}
                        innerRef={autocompleteInput}
                        onChange={searchUser}
                        displayOption={renderUser}
                        onOptionSelected={selectUser}
                    />
                    { userExists() && <div className="client-search-name-validation" /> }
                </div>

                <button className="primary columns" type="submit">
                    <span>Passer commande</span>

                    <img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider" />
                </button>
            </form>
        </div>
    );
};

export default ClientSearch;
