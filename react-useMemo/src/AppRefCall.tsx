import { ChangeEventHandler, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import './styles.scss';

import debounce from 'lodash/debounce';

const sendBackendRequest = (value: string) => {
    console.log('Changed value:', value);
}

const debouncedOnChange = debounce(sendBackendRequest,1000);

const DebounceWithStateInside = () => {
    const [value, setValue] = useState('initial');

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;

        setValue(value);
        debouncedOnChange(value)
    }

    return <input type='text' onChange={onChange} value={value} />
}

const DebounceWithStateOutside = () => {
    const [value, setValue] = useState('initial');

    const sendBackendRequest = useCallback((v: string) => {
        // send request to the backend here
        console.log('request--->',v);
    }, [])

    // const debouncedSend = debounce(sendBackendRequest, 1000);
    const debouncedSendRequest = useMemo(() => {
        return debounce(sendBackendRequest, 1000);
    }, [sendBackendRequest])

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
        debouncedSendRequest(e.target.value);
    }

    return <input type='text' onChange={onChange} value={value}/>
}

const SimpleDebounceWithUseCallback = () => {
    const [value, setValue] = useState('initial');
  
    const ref = useRef(() => {
        debounce(() => {
            console.log('Changed value:', value);
        }, 500)
    })
    
    useEffect(() => {
        ref.current = debounce(() => {
            console.log('Changed value:', value);
        }, 500);
        // cancel the debounce callback before
        return () => ref.current.cancel()
    }, [value])

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      setValue(value);
      ref.current();
    };
  
    return <input type="text" onChange={onChange} value={value} />;
  };

const DebounceWithStateAndRef = () => {
    const [value, setValue] = useState('initial');

    const ref = useRef<any>();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChange = () => {
        console.log('State value:', value);
    }

    useEffect(() => {
        ref.current = onChange;
    }, [onChange])

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.()
        }
        return debounce(func, 1000)
    }, [])

    return (
        <input type='text' onChange={(e) => {
            setValue(e.target.value);
            debouncedCallback();
        }} value={value}/>
    )
}

const useDebounce = (callback: () => void) => {
    const ref = useRef<any>();

    useEffect(() => {
        ref.current = callback;
    }, [callback])

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        }

        return debounce(func, 1000)
    }, [])

    return debouncedCallback;
}

const DebounceWithUseCallbackAndState = () => {
    const [value, setValue] = useState('initial');
  
    const onChange = () => {
      console.log('State value:', value);
    };
  
    const debouncedOnChange = useDebounce(onChange);
  
    return (
      <input
        type="text"
        onChange={(e) => {
          debouncedOnChange();
          setValue(e.target.value);
        }}
        value={value}
      />
    );
  };

export default function App() {
    return (
        <div className="App">
            <h1>Controlled components with broken debouncing</h1>
            <h3>Open console and type something in inputs</h3>
            <div className="container">
                <div className="column">
                <h3>Debounced with state inside</h3>
                <DebounceWithStateInside />
                Doesn't work at all
                </div>
                <div className="column">
                <h3>Debounced with state outside</h3>
                <DebounceWithStateOutside />
                Debouncing is broken
                </div>
                <div className="column">
                <h3>Debounced callback with state inside</h3>
                <SimpleDebounceWithUseCallback />
                Just turned into a delay function
                </div>
                <div className="column">
                <h3>Debounce with state and ref</h3>
                <DebounceWithStateAndRef />
                Works like a charm!
                </div>
                <div className="column">
                <h3>Extracted into a hook</h3>
                <DebounceWithUseCallbackAndState />
                Still works!
                </div>
            </div>
        </div>
    )
}