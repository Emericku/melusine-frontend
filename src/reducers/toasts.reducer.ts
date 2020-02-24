import { ToastsAction, ToastsActionType } from "../actions/toasts.actions";
import { Toast } from "../models/toast.model";

export const toastsInitialState = {
    content: [] as Toast[]
};

export default function toastsReducer(prevState = toastsInitialState, action: ToastsAction) {
    switch (action.type) {
        case ToastsActionType.ADD_TOAST: {
            const { content } = prevState;
            const newItem: Toast = { id: action.id, level: action.level, content: action.content };
            return { content: [ newItem, ...content ] };
        }

        case ToastsActionType.REMOVE_TOAST: {
            const content = prevState.content.filter(toast => toast.id !== action.id);
            return { content: [ ...content ] };
        }

        default:
            return prevState;
    }
}
