import React, { FunctionComponent, useEffect, useState } from 'react';
import User from '../../models/user.model';
import userService from '../../services/userService';
import UserList from '../layout/UserList';
import UserForm from '../layout/UserForm';
import './UserPage.scss';

const UserPage: FunctionComponent = () => {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        userService.getUsers()
            .then(response => setUsers(response.content))
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, []);

    return (
        <div className="user-main">
            <div className="user-list">
                {isLoading ?
                    'Loading ...' :
                    error.length > 0 ?
                        error :
                        <UserList users={users} />
                }
            </div>
            <div className="user-form">
                <UserForm />
            </div>
        </div>
    );
}
export default UserPage;