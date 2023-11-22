/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added':
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }]
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task
                } else {
                    return t;
                }
            })
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id)
        }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export function TasksProvider({children}) {
    const [task, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={task}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasksDispatch() {
    
   return useContext(TasksDispatchContext);
}

export function useTasks(){
    return useContext(TasksContext)
}
