import React, { FunctionComponent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import User from '../../models/user.model';
import userService from '../../services/userService';
import UserList from '../layout/UserList';
import './UserPage.scss';

const UserPage : FunctionComponent = () => {
    const [ isLoading, setLoading ] = useState(false);
    const [ users, setUsers ] = useState<User[]>([]);
    const [ error, setError ] =  useState("");

    useEffect(() => {
        setLoading(true); 

        userService.getUsers()
            .then(response => setUsers(response.content))
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, []);

    return (
        <>
            <nav className="dashboard-menu">
                <NavLink to="/dashboard">
                    <img src="/assets/icons/crossed-knife-and-fork.svg" alt="Fork and Knife" />
                    <span>Commande</span>
                </NavLink>

                <a href="/">
                    <img src="/assets/icons/food.svg" alt="Food" />
                    <span>Livraison</span>
                </a>

                <a href="/">
                    <img src="/assets/icons/groceries.svg" alt="Products" />
                    <span>Produits</span>
                </a>

                <NavLink to="/clients">
                    <img src="/assets/icons/team.svg" alt="Clients" />
                    <span>Clients</span>
                </NavLink>

                <a href="/">
                    <img src="/assets/icons/turn-off.svg" alt="Clients" />
                    <span>Déconnexion</span>
                </a>
            </nav>

            <div className="dashboard-content">
                <main>
                    <div className="user-list">
                        { isLoading ? 
                            'Loading ...' : 
                            error.length > 0 ? 
                                error :
                                <UserList users={users}/> 
                        }
                    </div>
                    <div>
                    </div>              
                </main>
            </div>
        </>
    );
}
export default UserPage;