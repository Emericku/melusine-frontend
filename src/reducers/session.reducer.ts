import { SessionAction, SessionActionType } from "../actions/session.actions";
import authenticationService from "../services/authentication.service";

export const sessionInitialState = {
    isAuthenticated: authenticationService.isAuthenticated(),
    connectedUser: authenticationService.getConnectedUser()
};

export default function sessionReducer(prevState = sessionInitialState, action: SessionAction) {
    switch (action.type) {
        case SessionActionType.LOGIN:
            return { isAuthenticated: true, connectedUser: action.connectedUser };

        case SessionActionType.LOGOUT:
            return { isAuthenticated: false, connectedUser: { id: '', email: '' } };

        default:
            return prevState;
    }
}
