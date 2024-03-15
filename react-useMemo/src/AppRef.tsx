import { ChangeEvent, RefObject, forwardRef, useEffect, useRef, useState, ForwardedRef } from 'react';

import './styles.scss';
import { Button } from './components/Button';
import { Modal } from './components/Modal';

// type inputRefProps = {
//     onChange: (val: string) => void;
//     inputRef: RefObject<HTMLInputElement>
// }
type inputRefProps = {
    onChange: (val: string) => void;
}

// const InputField = ({inputRef, onChange}: inputRefProps) => {

//     return <input ref={inputRef} type='text' onChange={(e) => onChange(e.target.value)}/>
// }
const InputField = forwardRef(({ onChange}: inputRefProps, ref: ForwardedRef<HTMLInputElement>) => {

    return <input ref={ref} type='text' onChange={(e) => onChange(e.target.value)}/>
});


const usePrevious = <T extends unknown>(value: T): T => {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current;
}

const SearchResults = ({search}: {search: string}) => {
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        console.log(showResults, search);
    })

    return (
        <>
             Searching for: {search} <br />
             {/*This will trigger re-render*/}
             <Button onClick={() => setShowResults(!showResults)}>show results</Button>
        </>
    )
}

const FormWithState = () => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        console.log('re-render FormWithState');
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const submit = () => {
        // send to the backend here
        console.log(value);
    };

    const numberOfLetters: number = value?.length?? 0;

    return (
        <div className="column">
            <h3>Form with state</h3>
            <input type="text" onChange={onChange} />
            <br />
            Number of letters: {numberOfLetters}
            <br />
            <Button onClick={submit}>submit</Button>
            <SearchResults search={value} />
        </div>
    )
}

const FormWithRef = () => {
    const ref = useRef('');

    useEffect(() => {
        console.log('re-render FormWithRef');
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("before", ref.current);
        ref.current = e.target.value;
        console.log('after', ref.current);
    }

    const onSubmin = () => {
         // send to the backend here
        console.log(ref.current)
    }

    const numberOfLetters = ref.current?.length ?? 0;
    return (
        <div className="column">
            <h3>Form with ref</h3>
            <input type="text" onChange={onChange} />
            <br />
                Number of letters: {numberOfLetters}
            <br />
            <Button onClick={onSubmin}>submit</Button>
            {/*will never be updated*/}
            <SearchResults search={ref.current} />
        </div>
    )
}

export default function App() {
    const [isOpen, setIsOpen] = useState(false);

    const [state, setState] = useState(false);
    const reRendersRef = useRef(1);
    const [value, setValue] = useState<string>('');
    const previousValue = usePrevious(value);

    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitClick = () => {
        if(!name){
            inputRef.current?.focus();
            console.log('Input should be focused if empty!');
        } else {
            console.log('Submit the name here!', name);
        }
    }

    useEffect(() => {
        // store how many times a component re-renders
        reRendersRef.current = reRendersRef.current + 1;
        console.log('Render number', reRendersRef.current);
        console.log(`value--> ${value}, previous--> ${previousValue}`)
    })

    useEffect(() => {
        if (previousValue.length > value.length) {
            console.log('Text was deleted');
        } else {
            console.log('Text was added');
        }
    }, [previousValue, value])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <div className="App">
            <h1>Refs for storing values: Form component</h1>

            <div className="container">
                <FormWithState />
                <FormWithRef />
            </div>
            <div className="container">
                <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
                {isOpen ? <Modal onClose={() => setIsOpen(false)}>modal content</Modal> : null}
            </div>
            <div className="column">
                <h3>Form with state</h3>
                <input type="text" onChange={onChange} value={value} />
                <Button onClick={() => setState(!state)}>Click to trigger re-render</Button>
            </div>
            <div className="column">
                <label>Name</label>
                <br />
                {/* <input type="text" ref={inputRef} onChange={(e) => setName(e.target.value)} /> */}
                <InputField  ref={inputRef} onChange={setName}/>
                <Button onClick={onSubmitClick}>Submit!</Button>
            </div>
        </div>
    )
}