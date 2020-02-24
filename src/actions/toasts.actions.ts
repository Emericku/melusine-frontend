import { ToastLevel } from "../models/toast.model";

export enum ToastsActionType {
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST'
}

export type ToastsAction = 
    { type: ToastsActionType.ADD_TOAST, id: number, level: ToastLevel, content: string } |
    { type: ToastsActionType.REMOVE_TOAST, id: number };

export const addToast = (id: number, level: ToastLevel, content: string): ToastsAction => ({
    type: ToastsActionType.ADD_TOAST,
    id,
    level,
    content
});

export const removeToast = (id: number): ToastsAction => ({
    type: ToastsActionType.REMOVE_TOAST,
    id
});
