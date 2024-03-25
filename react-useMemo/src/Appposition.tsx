import './modal.scss';
import './global.scss';
import { useState, useRef, MutableRefObject, useLayoutEffect } from 'react';

import { Button } from './components/Button';

const SomeComponent = () => <div className="some">some text here</div>;

const ModalDialog = ({ onClose, triggerRef, zIndex }: { onClose: () => void; triggerRef:  MutableRefObject<HTMLButtonElement | null>; zIndex?: number}) => {
    const [state, setState] = useState({top: 0, left: 0});

    useLayoutEffect(() => {
        setState({
            left: (triggerRef.current?.offsetLeft || 0) - 10,
            top: (triggerRef.current?.offsetTop || 0) + 30
        })
    }, [triggerRef])
    return (
        <div className='modal' style={{ top: state.top, left: state.left, zIndex }}>
            Dialog is positioned relative to the trigger now
            <br />
            <br />

            <Button onClick={onClose}>close dialog</Button>
        </div>
    )
}

type Dialogs = 'grey1' | 'grey2' | 'red1' | 'red2';

export default function App() {
    const refGrey1 = useRef(null);
    const refRed1 = useRef(null);
    const refGrey2 = useRef(null);
    const refRed2 = useRef(null);

    const [showDialog, setShowDialog] = useState<Dialogs | undefined>();

    return (
        <div className='App'>
            <h1>Hello CodeSandbox</h1>
            <h4>Click button to show the dialog on top</h4>
            <div className='layout'>
                <div className='sidebar' style={{width: '50%'}}>
                    Grey div triggered its own stacking context. And its underneath the red div.
                    <br />
                    <br />
                    The dialog has z-index 9999, but it doesn't matter. It's scoped to the grey div, so it will appear under the red one
                    <div className='grey' style={{position: 'relative', zIndex: 1}}>
                        grey
                        <br />
                        <Button onClick={() => setShowDialog('grey1')} ref={refGrey1}>
                            open dialog
                        </Button>
                        {
                            showDialog == 'grey1' && <ModalDialog onClose={() => setShowDialog(undefined)} triggerRef={refGrey1}  zIndex={9999} /> 
                        }
                    </div>
                    <div className='red' style={{position: 'relative', zIndex: 2}}>
                        red
                        <br />
                        <Button onClick={() => setShowDialog('red1')} ref={refRed1}>
                            open dialog
                        </Button>
                        {
                            showDialog == 'red1' && <ModalDialog onClose={() => setShowDialog(undefined)} triggerRef={refRed1}  zIndex={9999} /> 
                        }
                    </div>
                   
                    <div className="green">green</div>
                </div>
                <div className='main'>
                    New stacking context is triggered by "transform" CSS property
                    <br />
                    <br />
                    The dialog inside the grey div will appear "underneath" the red div because of it
                    <br />
                    <br />
                    <div className='grey' style={{ transform: 'translate(0, 0)' }}>
                        grey
                        <br />
                        <Button onClick={() => setShowDialog('grey2')} ref={refGrey2}>
                            open dialog
                        </Button>
                        {
                            showDialog === 'grey2' && <ModalDialog onClose={() => setShowDialog(undefined)} triggerRef={refGrey2} zIndex={9999}/>
                        }
                    </div>
                    <div className='red' style={{ position: 'relative', zIndex: 2 }}>
                        red
                        <br />
                        <Button onClick={() => setShowDialog('red2')} ref={refRed2}>
                            open dialog
                        </Button>
                        {
                            showDialog === 'red2' && <ModalDialog onClose={() => setShowDialog(undefined)} triggerRef={refGrey2} zIndex={9999}/>
                        }
                    </div>
                    <div className="red" style={{ overflow: 'hidden', position: 'relative' }}>
                        red hidden
                        <br />
                        <Button onClick={() => setShowDialog('red1')} ref={refRed1}>
                            open dialog
                        </Button>
                        {showDialog === 'red1' && <ModalDialog onClose={() => setShowDialog(undefined)} triggerRef={refRed1} zIndex={9999} />}
                    </div>
                    <div className="green">green</div>
                </div>
            </div>
        </div>
    )
}