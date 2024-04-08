import { useState, useEffect, ReactNode } from 'react';
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

const ScrollableWithMovingBlock = ({children}: {children: ReactNode}) => { // 如果我们将slow components 依据children 的方式，传递，当 position 更新时， React 会比较 before 
    // and after 的组件 是否有变化，如果有，就重新渲染，如果没有就不重新渲染，所以在这个例子中， Type: Children 前后是一样的，所以不用重新渲染。
    const [position, setPosition] = useState(150);

    const onScroll = (e: any) => {
        const calculated = getPosition(e.target.scrollTop);

        setPosition(calculated);
    }

    return (
        <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            {/* put our content prop here, where the slow bunch of stuff used to be */}
            {children}
        </div>
    )
}

export default function App() {
    const slowComponents = (
        <>
          <VerySlowComponent />
          <BunchOfStuff />
          <OtherStuffAlsoComplicated />
        </>
      );

    return <ScrollableWithMovingBlock children={slowComponents} />;
}