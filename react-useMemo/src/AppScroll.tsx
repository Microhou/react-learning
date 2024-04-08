import { useState, useEffect } from 'react';
import { VerySlowComponent } from './components/VerySlow';
import './styles.scss';



export const BunchOfStuff = () => <div className="bunch-of-stuff">Bunch of stuff</div>;
export const OtherStuffAlsoComplicated = () => <div>Other stuff</div>;

const MovingBlock = ({position}: {position: number}) => {

    return (
        <div className="movable-block" style={{ top: position }}>
            {position}
        </div>
    )
}
// just hard-coded approximation to demonstrate the re-renders problem
// not to be used in real code

const getPosition = (val: number) => 150 - val / 2;

export default function App() {
    const [position, setPosition] = useState(150);
    const [arrow, setArrow] = useState(false);
    // const [scrollTop, setScrollTop] = useState(0);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //         setScrollTop(scrollTop);
    //     }

    //     window.addEventListener('scroll', handleScroll)

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [])

    const onScroll = (e: any) => {
        const calculated = getPosition(e.target.scrollTop);

        setPosition(calculated)

        if(calculated < 150){
            setArrow(true)
        } else {
            setArrow(false)
        }
    }

    return (
        <div className="scrollable-block" onScroll={onScroll}> 
        {/* {还有onScroll的事件，这个以前不知道} */}
             {/* pass position value to the new movable component */}
             <MovingBlock position={position} />
             <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
            {/* <p>Scroll Top: {scrollTop}px</p> */}
            {arrow && <div className="movable-block" style={{ top: position+30 }}>{"<<<<"}</div>}
        </div>
    )
}