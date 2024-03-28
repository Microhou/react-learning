import { useState } from "react";
import { createPortal } from 'react-dom';

import { Button } from './components/Button';
import StreamResponseComponent from './Stream';

import './modal.scss';

const ModalDialog = ({onClose}: {onClose: () => void}) => {
    return (
        <div className="modal center" style={{ zIndex: 99, position: 'fixed' }}>
             Dialog should be in the middle of the screen
            <br />
            <br />
             but it's not
            <br />
            <br />
            <Button onClick={onClose}>close dialog</Button>
        </div>
    )
}

export default function App() {
    const [isNavExpanded, setIsNavExpanded] = useState(true);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div className="App">
            <div className="header">Header is sticky</div>
            <h1>Hello CodeSandbox</h1>
            <Button onClick={() => setIsNavExpanded(!isNavExpanded)}>expand/collapse nav</Button>
            <div className="layout">
                <div className="sidebar" style={{ transform: isNavExpanded ? "translate(0, 0)" : 'translate(-300px, 0)', height: 3000 }}>
                    Navigation links go here
                </div>
                <div className="main" style={{ transform: !isNavExpanded ? 'translate(-300px, 0)': 'translate(0,0)'}}>
                    main part
                    <br />
                    <Button onClick={() => setShowDialog(true)}>open fixed dialog</Button>
                    {
                        showDialog && createPortal(<ModalDialog onClose={() => setShowDialog(false)}/>, document.getElementById('root') as any)
                    }
                </div>
                <StreamResponseComponent />
            </div>
        </div>
    )
}