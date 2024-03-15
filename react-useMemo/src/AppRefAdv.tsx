import React, { useEffect, useRef, useState, useCallback } from 'react';
import './global.scss';

type HeavyComponentProps = {
    onClick: () => void;
    title: string;
}

const HeavyComponent = ({onClick, title}: HeavyComponentProps) => {

    return (
        <>
            <h3>{title}</h3>
            <p>Some other stuff here</p>
            <button className="button" onClick={onClick}>
                Done!
            </button>
        </>
    )
}

// const HeavyComponentMemo = React.memo(HeavyComponent, (before, after) => {
//     return before.title === after.title;
// })
const HeavyComponentMemo = React.memo(HeavyComponent);

export default function App() {
    const [value, setValue] = useState<string>();

    const ref = useRef(() => {});

    useEffect(() => {
        ref.current = () => {
            console.log(value)
        }
    })
    const onClick = useCallback(() => {
        // call the ref here
        ref.current?.();
    }, []);

    return (
        <div className="App">
            <h1>Closures example</h1>
            <>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <HeavyComponentMemo title='Welcome closures'  onClick={onClick}/>
            </>
            <div className='parent'>
                <div className='child'>center</div>
            </div>
        </div>
    )
}