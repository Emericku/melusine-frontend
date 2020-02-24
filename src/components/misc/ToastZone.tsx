import React, { FunctionComponent, useEffect } from 'react';
import { useAppState } from '../../store';
import config from '../../config';

import './ToastZone.scss';

const ToastZone: FunctionComponent = () => {
    const [ { toasts } ] = useAppState();

    useEffect(() => {
        document.body.style.setProperty('--toast-duration', `${config.toastDuration}s`);
    }, []);

    return (
        <div className="toast-zone">{
            toasts.content.map(toast => (
                <div key={toast.id} className={`toast toast-${toast.level}`}>
                    {toast.content}
                </div>
            ))
        }</div>
    );
};

export default ToastZone;
