import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AnotherVerySlowComponent, VerySlowComponent } from './util/very-slow-component';
import './styles.scss';

const Context = React.createContext({
    isNavExpanded: false,
    toggle: () => {},
    open: () => {},
    close: () => {}
})

const NavigationController = ({children}: {children: ReactNode}) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const toggle = useCallback(() => {setIsNavExpanded(!isNavExpanded)}, [isNavExpanded]);

    const open = useCallback(() => { setIsNavExpanded(true)}, []);

    const close = useCallback(() => {setIsNavExpanded(false)}, []);

    const value = useMemo(() => {
        return { isNavExpanded, toggle, close, open}
    }, [close, isNavExpanded, open, toggle]);

    return (
        <Context.Provider value={value}>{children}</Context.Provider> // 通过value 把 toggle, open 等值 传递给context
    )

}

const useNavigation = () => useContext(Context);

const AdjustableColumnsBlock = () => {
    const { isNavExpanded } = useNavigation();
    return isNavExpanded ? <div>two block items here</div> : <div>three block items here</div>;
};
const withNavigationOpen = (AnyComponent: any) => {
    // wrap the component from the arguments in React.memo here
    const AnyComponentMemo = React.memo(AnyComponent);

    return (props: any) => {
        const { open } = useContext(Context);
        // return memoized component here
        // now it won't re-render because of Context changes
        // make sure that whatever is passed as props here don't change between re-renders!
        return <AnyComponentMemo {...props} openNav={open} />
    }
}

const MainPart = withNavigationOpen(({openNav}: {openNav: () => void}) => {
    useEffect(() => {
        // won't be triggered when context value changes
        // because toggleNav is coming from memoized HOC
        console.info('Main part re-render');
    });

    return (
        <>
            <div>
                <button onClick={openNav}>click to expand nav - inside heavy component</button>
            </div>
            <VerySlowComponent />
            <AnotherVerySlowComponent />
            <AdjustableColumnsBlock />
        </>
    )
})

const ExpandButton = () => {
    const { isNavExpanded, toggle } = useNavigation();

    useEffect(() => {
        console.info('Button that uses Context re-renders');
    });

    return (
        <button onClick={toggle}>{isNavExpanded ? 'collapse <' : 'expand >'}</button>
    )
}

const SidebarLayout = ({children}: {children: ReactNode}) => {
    const { isNavExpanded } = useNavigation();

    return (
        <div className='left' style={{ flexBasis: isNavExpanded ? '50%' : '20%' }}>
            {children}
        </div>
    )
}

const Sidebar = () => { 
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
        window.addEventListener('scroll', () => {
        setScroll(window.scrollY);
        });
    }, []);

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
    )
}

export default function App() {
    return (
        <>
            <h3>Very slow "Page" component - click on expand/collapse to toggle nav</h3>
            <p>Scrolling causes re-render of everything that uses Context</p>
            <Page />
        </>
    )
}