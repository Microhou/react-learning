import { useState } from "react";
import { useTasksDispatch } from './TasksContext.jsx';


let nextId = 3;

export default function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch();

    const handleClick = () => {
        setText('');
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        });
    }
    return (
        <>
            <input type="text" placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={handleClick}>Add</button>
        </>
    )
}