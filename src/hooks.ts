import { Fetcher } from "./models/fetcher.model";
import { useAppState } from "./store";
import { useEffect } from "react";

export const useDataFetch = <MODEL> (execute: () => Promise<MODEL>, fetcher: Fetcher<MODEL, any>): void => {
    const [ , dispatch ] = useAppState();

    useEffect(() => {
        dispatch(fetcher.started());

        execute()
            .then(data => dispatch(fetcher.done(data)))
            .catch(error => dispatch(fetcher.failed(error.message)));
    }, [ dispatch, execute, fetcher ]);
};
