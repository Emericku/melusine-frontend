import { ConnectedUser } from "../models/user.model";

export enum SessionActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export type SessionAction = 
    { type: SessionActionType.LOGIN, connectedUser: ConnectedUser } |
    { type: SessionActionType.LOGOUT };

export const loginUser = (connectedUser: ConnectedUser): SessionAction => ({
    type: SessionActionType.LOGIN,
    connectedUser
});

export const logoutUser = (): SessionAction => ({
    type: SessionActionType.LOGOUT
});
