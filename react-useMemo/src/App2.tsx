import React, { ReactNode, useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from './components/Button';
import './App.css'

type ChildProps = { children:  ReactNode};
const Child = ({children}: ChildProps) => {
  useEffect(() => {
    console.info('Child re-renders');
  });
  return <div>Some Child {children}</div>
}

const ChildMemo = React.memo(Child);

function App() {
  const [state, setState] = useState(1);

  const memoChildren = useMemo(() => <div>some children</div>, []);

  return (
    <>
      <Button onClick={() => setState(state + 1)}>Click to trigger re-render {state}</Button>
      <h3>Children are not memoized here</h3>
      <p>this ChildMemo component will re-render when the button is clicked</p>
      <ChildMemo>
        <div>some children</div>
      </ChildMemo>
      <h3>Children ARE memoized here</h3>
      <p>this ChildMemo component WON'T re-render when the button is clicked</p>
      <ChildMemo>{memoChildren}</ChildMemo>
    </>
  )
}

export default App
