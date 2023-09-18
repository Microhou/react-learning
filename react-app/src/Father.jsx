/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
function Father(props) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        console.log('Father');
      }, [])
    
    return (
        <div onClick={() => {setNum(num + 1)}}>
            {num}
            {props.children}
        </div>
    )
}

export default Father;