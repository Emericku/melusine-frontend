import { useCallback } from 'react';
import { useAppState } from './store';
import { Fetcher } from './models/fetcher.model';
import { Action } from './reducers';

export const useDataFetch = <MODEL> (execute: () => Promise<MODEL>, fetcher: Fetcher<MODEL, Action>) => {
    const [ , dispatch ] = useAppState();

    return useCallback(() => {
        dispatch(fetcher.started());

        execute()
            .then(data => dispatch(fetcher.done(data)))
            .catch(error => dispatch(fetcher.failed(error.message)));
    }, [ dispatch, execute, fetcher ]);
};
