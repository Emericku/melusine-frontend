import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useAppState } from './store';
import { logoutUser } from './actions/session.actions';
import { addToast, removeToast } from './actions/toasts.actions';
import { ToastLevel } from './models/toast.model';
import authenticationService from './services/authentication.service';
import config from './config';

export const useChangeTitle = (title: string) => {
    useEffect(() => {
        document.title = `${config.appName} - ${title}`;
    }, [ title ]);
};

export const useModal = (defaultState = false) => {
    const [ isModalOpened, setModalOpened ] = useState(defaultState);
    
    const toggleModal = useCallback(() => {
        setModalOpened(!isModalOpened);
    }, [ isModalOpened ]);

    return { isModalOpened, toggleModal };
};

export const useToast = () => {
    const [ , dispatch ] = useAppState();

    const createToast = useCallback((level: ToastLevel, content: string) => {
        const toastId = Date.now();
        dispatch(addToast(toastId, level, content));

        setTimeout(() => {
            dispatch(removeToast(toastId));
        }, config.toastDuration * 1000);
    }, [ dispatch ]);

    return createToast;
};

export const useAuthExpirationRedirection = () => {
    const [ , dispatch ] = useAppState();

    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401 && error.response.data.code === 'A0004') {
                    authenticationService.clear();
                    dispatch(logoutUser());

                    const responseOverride = {
                        status: error.response.status,
                        data: {
                            code: error.response.data.code,
                            message: "Votre session a expiré. Veuillez vous reconnecter"
                        }
                    };

                    const customError = { ...error, response: responseOverride };
                    return Promise.reject(customError);
                }

                return Promise.reject(error);
            }
        )
    }, [ dispatch ]);
};
