import React, { FunctionComponent, useEffect, useState, useCallback, FormEvent } from 'react';
import { UserResponse } from '../../models/user.model';
import userService from '../../services/user.service';
import ClientList from '../layout/ClientList';
import ClientForm from '../layout/ClientForm';
import './ClientPage.scss';
import { useToast } from '../../hooks';
import Spinner from '../misc/Spinner';

const ClientPage: FunctionComponent = () => {
    const createToast = useToast();

    const [searchText, setSearchText] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [selctedUser, setSelectedUser] = useState<UserResponse>();

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

    const selectUser = useCallback((user: UserResponse) => {
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
            .catch(e => console.log('error', e))
            .finally(() => setLoading(false))
    }, []);

    return (
        <div className="user-main">
                {isLoading ?
                    <Spinner /> :
                        <ClientList users={users} selectUser={selectUser} searchUser={searchUser} searchText={searchText} />
                }
                <ClientForm selectedUser={selctedUser} resetUser={resetUser} refreshUsers={refreshUsers} />
        </div>
    );
}
export default ClientPage;