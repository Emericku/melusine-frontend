export type ToastLevel = 'success' | 'error';

export interface Toast {
    id: number;
    level: ToastLevel,
    content: string;
}
