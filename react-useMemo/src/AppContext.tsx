import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { AnotherVerySlowComponent, VerySlowComponent } from './util/very-slow-component';

import './styles.scss';

// const Context = React.createContext({
//     isNavExpanded: false,
//     toggle: () => {},
//   });

type State = {isNavExpanded: boolean};
const defaultState: State = {isNavExpanded: false};

const ContextData = React.createContext(defaultState);
// const ContextData = React.createContext({isNavExpanded: false});

const ContextApi = React.createContext({open: () => {}, close: () => {}, toggle: () => {}});

type Action = { type: 'open-sidebar' | 'close-sidebar' | 'toggle-sidebar'};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'open-sidebar':
            return { ...state, isNavExpanded: true};
        
        case 'close-sidebar':
            return {...state, isNavExpanded: false };
        case 'toggle-sidebar':
            return {...state, isNavExpanded: !state.isNavExpanded}
        default:
           return state;
    }
}

const NavigationController = ({children}: {children: ReactNode}) => {
    // const [isNavExpanded, setIsNavExpanded] = useState(false);

    // const toggle = useCallback(() => setIsNavExpanded(!isNavExpanded), [isNavExpanded]) 
    
    // const value = useMemo(() => ({isNavExpanded, toggle}), [isNavExpanded, toggle]);

    // const open = useCallback(() => setIsNavExpanded(true), []);

    // const close = useCallback(() => setIsNavExpanded(false), []);

    // const data = useMemo(() => ({isNavExpanded}), [isNavExpanded]);

    // const api = useMemo(() => ({open, close}), [close, open]);

    const [state, dispatch] = useReducer(reducer, defaultState);

    const data = useMemo(() => ({ isNavExpanded: state.isNavExpanded}), [state]);

    const api = useMemo(() => {
        return {
            open: () => dispatch({type: "open-sidebar"}),
            close: () => dispatch({type: 'close-sidebar'}),
            toggle: () => dispatch({type: "toggle-sidebar"})
        }
    }, [])

    return (
        <ContextData.Provider value={data}>
            <ContextApi.Provider value={api}>
                {children}
            </ContextApi.Provider>
        </ContextData.Provider>
    )
}

// const useNavigation = () => useContext(Context);
const useNavigationData = () => useContext(ContextData);
const useNavigationApi = () => useContext(ContextApi);

const AdjustableColumnsBlock = () => {
    const { isNavExpanded } = useNavigationData();
    return isNavExpanded ? <div>two block items here</div> : <div>three block items here</div>;
}

const SomeComponent = () => {
    const { toggle } = useNavigationApi();

    useEffect(() => {
        console.info("SomeComponent won't re-render on navigation expand/collapse, even though it uses Context");
      });

    return (
        <div>
            <button onClick={toggle}>Toggle nav</button>
        </div>
    )
}

const MainPart = () => {
    return (
        <>
            <SomeComponent />
            <VerySlowComponent />
            <AnotherVerySlowComponent />
            <AdjustableColumnsBlock />
        </>
    )
}

const ExpandButton = () => {
    const { isNavExpanded } = useNavigationData();
    const { toggle } = useNavigationApi();

    useEffect(() => {
        console.info("Button that uses Context data re-renders. But SomeComponent won't");
    });
    return (
        <button onClick={toggle}>{isNavExpanded ? 'collapse <' : 'expand >'}</button>
    )
}

const SidebarLayout = ({children}: {children: ReactNode}) => {
    const { isNavExpanded } = useNavigationData();

    return (
        <div className="left" style={{ flexBasis: isNavExpanded ? '50%' : '20%' }}>
            {children}
        </div>
    )
}

const Sidebar = () => {
    useEffect(() => {
        console.log("this is Sidebar component");
    })
    return (
        <SidebarLayout>
            {/* this one will control the expand/collapse */}
            <ExpandButton />
            <ul>
                <li>
                <a href="#">some links</a>
                </li>
            </ul>
        </SidebarLayout>
    )
}

const Layout = ({children}: {children: ReactNode}) => {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.screenY);
        })
    }, [])

    return (
        <NavigationController>
            <div className="three-layout">{children}</div>
        </NavigationController>
    )
}

const Page = () => {
    return (
        <Layout>
          <Sidebar />
          <MainPart />
        </Layout>
    );
}
export default function App() {
    return (
      <>
        <h3>Very slow "Page" component - click on expand/collapse to toggle nav</h3>
        <p>Scrolling won't affect re-renders anymore - provider's value is memoized</p>
        <Page />
      </>
    );
  }