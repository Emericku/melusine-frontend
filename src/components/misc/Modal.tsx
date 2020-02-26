import React, { FunctionComponent, ReactNode } from 'react';

import './Modal.scss';

interface ModalProps {
    title: string;
    children: ReactNode;
    close: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ title, children, close }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <header>
                    <h3>{title}</h3>
                    <button className="modal-button" type="button" onClick={close}>×</button>
                </header>

                <main>
                    {children}
                </main>
            </div>ﬂ
        </div>
    );
}

export default Modal;
