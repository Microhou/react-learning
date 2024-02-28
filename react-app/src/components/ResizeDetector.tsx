import React, { useEffect, useState } from 'react';

const WideLayout = () => <div style={{ background: 'salmon', width: 600, padding: 20 }}>Wide layout</div>;
const NarrowLayout = () => <div style={{ background: 'salmon', width: 300, padding: 20 }}>Narrow layout</div>;

const useResizeDetector = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const listener = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [])

    return width;
}

const ResizeDetector = () => {
    const windowWidth = useResizeDetector();
  
    return windowWidth > 600 ? <WideLayout /> : <NarrowLayout />;
}

export default ResizeDetector;