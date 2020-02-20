import { useEffect, useCallback } from 'react';
import axios from 'axios';

import { useAppState } from './store';
import { Fetcher } from './models/fetcher.model';
import { Action } from './reducers';
import { useHistory } from 'react-router-dom';
import { logoutUser } from './actions/session.actions';
import authenticationService from './services/authentication.service';

export const useDataFetch = <MODEL> (execute: () => Promise<MODEL>, fetcher: Fetcher<MODEL, Action>) => {
    const [ , dispatch ] = useAppState();

    return useCallback(() => {
        dispatch(fetcher.started());

        execute()
            .then(data => dispatch(fetcher.done(data)))
            .catch(error => dispatch(fetcher.failed(error.message)));
    }, [ dispatch, execute, fetcher ]);
};

export const useAuthExpirationRedirection = (redirection: string) => {
    const [ , dispatch ] = useAppState();
    const history = useHistory();

    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            (error) => {
                if (error.response.status === 401 && error.response.data.code === 'A0004') {
                    authenticationService.clear();
                    dispatch(logoutUser());
                    history.push(redirection);
                }
            }
        )
    }, [ dispatch, history, redirection ]);
};
