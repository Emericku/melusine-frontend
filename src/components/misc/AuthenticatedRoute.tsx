import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAppState } from '../../store';

const AuthenticatedRoute: FunctionComponent<RouteProps> = ({ component: Component, ...rest }) => {
    const [ { session } ] = useAppState();

    return (
        <Route {...rest} render={(props) => (
            session.isAuthenticated ?
                Component && <Component {...props} /> :
                <Redirect to='/' />
        )} />
    );
}

export default AuthenticatedRoute;
