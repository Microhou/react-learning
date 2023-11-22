/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
    const [theme, setTheme] = useState('dark');
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <ThemeContext.Provider value={theme}>
            <CurrentUserContext.Provider 
                value={{
                    currentUser,
                    setCurrentUser
                }}
            >
                <Form/>
                <label>
                    <input 
                        type='checkbox'
                        checked={theme === 'dark'}
                        onChange={(e) => setTheme(e.target.checked? 'dark': 'light')}
                    />
                    Use dark mode
                </label>
            </CurrentUserContext.Provider>
        </ThemeContext.Provider>
    )
}

function Form() {
    return (
        <Panel title="Welcome">
            <Button>Sign up</Button>
            <Button>Log in</Button>
            <LoginButton/>
        </Panel>
    )
}

function Panel({title, children}) {
    const theme = useContext(ThemeContext);
    const className = 'panel-'+ theme;

    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    )
}

function Button({children, onClick}) {
    const theme = useContext(ThemeContext);
    const className = 'button-' + theme;

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

function LoginButton() {
   const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
   
   if(currentUser !== null){
    return <p>You logged in as {currentUser.name}</p>
   }

    return (
        <Button onClick={() => setCurrentUser({name: "Advika"})}>Log in as Advika</Button>
    )
}