import React, { FunctionComponent, useCallback, FormEvent, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../store';
import { useChangeTitle, useToast } from '../../hooks';
import { Typeahead } from '@gforge/react-typeahead-ts';
import { UserSearchEntry } from '../../models/user.model';
import userService from '../../services/user.service';
import { initOrder } from '../../actions/order.actions';
import { priceFormatter } from '../../utils';

import './ClientSearch.scss';

const ClientSearch: FunctionComponent = () => {
    const history = useHistory();
    const [ , dispatch ] = useAppState();
    const createToast = useToast();
    const [ results, setResults ] = useState<UserSearchEntry[]>([]);
    const [ selected, setSelected ] = useState<UserSearchEntry>();    
    const autocompleteInput = useRef<HTMLInputElement | undefined>();

    useChangeTitle('Recherche');

    const selectUser = useCallback((opt) => {
        setSelected(opt as UserSearchEntry);
    }, [ setSelected ]);

    const clearUser = useCallback(() => {
        setSelected(undefined);
    }, [ setSelected ]);

    const searchUser = useCallback(async (e: FormEvent<HTMLInputElement>) => {
        clearUser();

        const { value } = e.currentTarget;

        if (value.length < 3) {
            return;
        }
        
       try {
           const users = await userService.findByName(value);
           setResults(users);
       } catch (e) {
           createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible");
       }
    }, [ clearUser, setResults, createToast ]);

    const renderUser = useCallback(({ firstName, lastName, nickName, credit }) => {
        return `${firstName} ${lastName}${nickName ? ` dit ${nickName} (${priceFormatter.format(credit)})` : ''}`;
    }, []);

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

        const clientName = userExists() ? selected?.nickName ? selected?.nickName: `${selected?.firstName} ${selected?.lastName}` : value;
        dispatch(initOrder(clientName, selected && userExists() ? selected: undefined));
        history.push('/dashboard/order');
    }, [ history, selected, userExists, dispatch ]);

    const clearSelection = useCallback(() => {
        history.push('/');
    }, [ history ]);

    return (
        <div className="client-search decorations">
            <h2>Rechercher un client</h2>

            <p>
                Avant de prendre commande, veuillez rechercher le client en complétant le champ ci-dessous. 
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
                    { selected && <button type="button" onClick={clearSelection}>×</button> }
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
