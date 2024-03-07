import React, { useEffect, useState } from 'react';
import {ButtonWithLoggingOnClick} from './components/LoggingButton';
import {ModalWithSuppressedKeyPress} from './components/Modal';
import {Button} from './components/Button';

import './global.scss';

export default function App() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('keypress', (e) => {
          console.info('Key pressed', e.key);
        });
    }, []);
     
    return (
        <>
            <h3>Button with logging on click</h3>
            <p>Logging is injected via HOC, but we still can use onClick prop</p>
            <ButtonWithLoggingOnClick
                onClick={() => {console.info('Click in prop');}}
                logText="button component from prop"
            >   
                Click me
            </ButtonWithLoggingOnClick>
            <p>If modal dialog is opened and focused, the key press events will stop propagating from it</p>
            <p>Our listener in useEffect will stop logging events when the modal is focused</p>
            <Button onClick={() => setIsOpen(true)}>Click to open dialog</Button>
            {
                isOpen && (
                    <ModalWithSuppressedKeyPress onClose={() => setIsOpen(false)}>
                        <input autoFocus placeholder="something" />
                    </ModalWithSuppressedKeyPress>
                )
            }
        </>
    )
}