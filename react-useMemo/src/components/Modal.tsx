import React, { ReactNode, useEffect, useState } from 'react';

import { Button } from './Button';

export const Modal = ({onClose, children}: {children: ReactNode, onClose: () => void}) => {
    return (
        <div className="modal-dialog">
          <div className="content">{children}</div>
          <div className="footer">
            <Button onClick={onClose}>close dialog</Button>
          </div>
        </div>
      );
}

export const withSuppressKeyPress = (Component: any) => {
    return (props: any) => {
        const onKeyPress = (event: any) => {
            event.stopPropagation();
        }
        return (
            <div onKeyPress={onKeyPress}>
                <Component {...props} />
            </div>
        )
    }
}

export const ModalWithSuppressedKeyPress = withSuppressKeyPress(Modal);