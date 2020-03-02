import React, { FunctionComponent, useEffect, useState, useCallback, FormEvent } from 'react';
import { User, UserResponse } from '../../models/user.model';
import userService from '../../services/user.service';
import ClientList from '../layout/ClientList';
import ClientForm from '../layout/ClientForm';
import './ClientPage.scss';
import { useToast } from '../../hooks';

const ClientPage: FunctionComponent = () => {
    const createToast = useToast();

    const [searchText, setSearchText] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [selctedUser, setSelectedUser] = useState<User>();

    const refreshUsers = useCallback(() => {
        userService.getUsers()
            .then(response => setUsers(response.content))
            .catch(e => createToast('error', e.response ? e.response.data.message : "Le serveur n'est pas disponible"))
            .finally(() => setLoading(false));
    }, [createToast])

    useEffect(() => {
        if (searchText.length === 0) {
            setLoading(true);
            refreshUsers();
        }
    }, [searchText, refreshUsers]);

    const selectUser = useCallback((user: User) => {
        setSelectedUser(user)
    }, [])

    const resetUser = useCallback(() => {
        setSelectedUser(undefined);
    }, []);

    const searchUser = useCallback((event: FormEvent<HTMLInputElement>) => {
        const inputUser = event.currentTarget.value;
        setSearchText(inputUser);
        if (inputUser.trim().length < 2) {
            return;
        }
        userService.findByName(inputUser)
            .then(response => setUsers(response))
            .catch(e => createToast('error', e.response ? e.response.data.message : ""))
            .finally(() => setLoading(false))
    }, [createToast]);

    return (
        <div className="user-main">
            <div>
                <div className="user-search-list">
                    <input
                        type="search"
                        onChange={searchUser}
                        value={searchText}
                        placeholder="Rechercher un client"
                    />
                </div>
                {isLoading ?
                    'Loading ...' :
                        <ClientList users={users} selectUser={selectUser} />
                }
            </div>
            <div className="user-form">
                <ClientForm selectedUser={selctedUser} resetUser={resetUser} refreshUsers={refreshUsers} />
            </div>
        </div>
    );
}
export default ClientPage;