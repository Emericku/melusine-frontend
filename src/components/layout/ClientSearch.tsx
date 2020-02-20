import React, { FunctionComponent, useCallback, FormEvent, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Typeahead } from '@gforge/react-typeahead-ts';

import './ClientSearch.scss';
import { UserSearchEntry } from '../../models/user.model';
import userService from '../../services/user.service';
import { useAppState } from '../../store';
import { initOrder } from '../../actions/order.actions';

const ClientSearch: FunctionComponent = () => {
    const [ , dispatch ] = useAppState();
    const [ results, setResults ] = useState<UserSearchEntry[]>([]);
    const [ selected, setSelected ] = useState<UserSearchEntry | null>(null);
    
    const autocompleteInput = useRef<HTMLInputElement | undefined>();
    const history = useHistory();

    const searchUser = useCallback((e: FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        if (value.length < 3) {
            return;
        }
        
        userService.findByName(value)
            .then(users => setResults(users))
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

        return selected && renderUser(selected) === value;
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

        dispatch(initOrder(value, selected && userExists() ? selected: undefined));
        history.push('/dashboard/order');
    }, [ history, selected, userExists, dispatch ]);

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

                <button className="primary columns space-button" type="submit">
                    <span>Passer commande</span>
                    <span><img width="20em" src="/assets/icons/left-arrow.svg" alt="Valider" /></span>
                </button>
            </form>
        </div>
    );
};

export default ClientSearch;
