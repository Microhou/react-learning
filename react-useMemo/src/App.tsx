import React, { useEffect, useState, useRef, useCallback } from 'react';

type HeavyComponentProps = {
    onClick: () => void;
    title: string;
}

const HeavyComponent = ({title, onClick}:  HeavyComponentProps) => {
    useEffect(() => {
        console.log("render")
    })

    return (
        <>
            <h3>{title}</h3>
            <p>Some other stuff here</p>
            <button className='button' onClick={onClick}>
                Done!
            </button>
        </>
    )
}

// const HeavyComponentMemo = React.memo(HeavyComponent, (before, after) => {
//     return before.title === after.title;
// })
const HeavyComponentMemo = React.memo(HeavyComponent);

function App() {
    const [value, setValue] = useState<string>();

    const ref = useRef<() => void>();
    // const onClick = () => {
    //     console.log(value) // value always is undefined
    // }

    // useEffect can fix above undefined
    useEffect(() => {
        ref.current = () => {
            console.log(value) 
        }
    })

    const onClick = useCallback(() => {
        ref.current?.();
    }, [])

    return (
        <div className='App'>
            <h1>Closures example</h1>
            <>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <HeavyComponentMemo title="Welcome closures" onClick={onClick} />
            </>
        </div>
    )
}

export default App;