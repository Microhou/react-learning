import React, { ReactNode, useState } from 'react';

import Button from './Button';
import './dialog.scss';

type ModalDialogProps = {
    children: ReactNode;
    footer: ReactNode;
    onClose: () => void;
}

const ModalDialog = ({children, footer, onClose}: ModalDialogProps) => {
    return (
        <div className='modal-dialog'>
            <div className='content'>
                {children}
                <Button onClick={onClose}>Close dialog</Button>
            </div>
            <div className="footer">{footer}</div>
        </div>
    )
}

export default ModalDialog;

