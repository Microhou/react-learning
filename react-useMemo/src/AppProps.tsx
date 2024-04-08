import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import './styles.scss';

export default function App() {
    let isOpen = false;
    
    return (
        <div className='layout'>
            {/* nothing will happen */}
            <Button onClick={() => (isOpen = true)}>Open dialog</Button>
            {/* will never show up */}
            {isOpen ? <Modal onClose={() => (isOpen = false)}>Modal</Modal> : null}
        </div>
    )
}