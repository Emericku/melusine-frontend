import React, { ReactNode, createContext, useReducer, useContext, Dispatch } from 'react';
import { reducer, initialState, GlobalState, Action } from './reducers';

const AppContext = createContext<any>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppContext.Provider>
);

export const useAppState: () => [ GlobalState, Dispatch<Action> ] = () => useContext(AppContext);
