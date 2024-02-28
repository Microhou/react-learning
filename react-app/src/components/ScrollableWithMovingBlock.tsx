import React, { ReactNode, useState } from "react";

import { BunchOfStuff, OtherStuffAlsoComplicated } from './mocks';
import { VerySlowComponent } from './very-slow-component';
import './style.css';

const MovingBlock = ({position}: {position: number}) => {
    return (
        <div className="movable-block" style={{top: position}}>
            {position}
        </div>
    )
}

const getPosition = (val: number) => 150 - val / 2;

const ScrollableWithMovingBlock = ({children}: {children: ReactNode}) => {
    const [position, setPosition] = useState(150);

    const onScroll = (e: any) => {
        const calculated = getPosition(e.target.scrollTop);
        setPosition(calculated);
    }

    return (
        <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            {children}
        </div>
    )
}

export default ScrollableWithMovingBlock;