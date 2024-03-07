import React, { useEffect, useState } from 'react';
import './global.scss';

type InputProps = {
    onChange?: () => void;
    placeholder: string;
    label?: string;
    id?: string;
}

const Input = ({onChange, placeholder, label, id}: InputProps) => {
    useEffect(() => {
        console.log(`Input mounted`);
      }, []);

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type='text' onChange={onChange} id={id} placeholder={placeholder}/>
        </>
    )
}

const data = [
    { id: 'business', placeholder: 'Business Tax' },
    { id: 'person', placeholder: 'Person Tax' },
  ];

const InputMemo = React.memo(Input);

const withTheme = (Component: any) => {
    //in reality that will come from something like context
    const isDark = true;
    const theme = isDark ? 'dark' : 'light';

    // making sure that we pass all props to the component back
    // and also inject the new one: theme
     return (props: any) => (<Component {...props} theme={theme}/>) 
}

const Button = ({theme}: {theme: 'dark'| 'light'}) => {
    return <button className={`button ${theme}`}>Button</button>
}

const ButtonWithTheme = withTheme(Button);

export default function App() {
    const [order1, setOrder1] = useState(false);
    const [order2, setOrder2] = useState(false);

    const inputs1 = order1 ? [...data].reverse() : data;
    const inputs2 = order2 ? [...data].reverse() : data;

    return (
        <div className='App'>
            <h1>"key" attribute example</h1>

            <div className='container'>
                <div className="column">
                    <h4>Inputs with array index as keys</h4>
                    <p>Inputs are memoized, but re-render when re-ordered</p>
                    <label>
                        <input type="checkbox" onChange={() => setOrder1(!order1)} />
                        Check to re-order
                    </label>
                    {inputs1.map((val, index) => (
                        <InputMemo placeholder={val.placeholder} key={index} />
                    ))}
                </div>
                <div className="column">
                    <h4>Inputs with id as key</h4>
                    <p>Inputs are memoized and don't re-render when re-ordered</p>
                    <label>
                        <input type="checkbox" onChange={() => setOrder2(!order2)} />
                        Check to re-order
                    </label>

                    {inputs2.map((val) => (
                        <InputMemo key={val.id} placeholder={val.placeholder} />
                    ))}
                </div>
            </div>
            <h3>"Dark theme" button</h3>
            <p>Theme is coming from HOC</p>
            <ButtonWithTheme />
            <h3>Or we can just pass it manually</h3>
            <p>Light theme is set via prop</p>
            <Button theme="light" />
        </div>
    )
}