import React, { useState, useEffect, useCallback } from 'react'
import { Button } from './components/Button';
import './App.css'

type ChildProps = { onChange: () => void };
const Child = ({onChange}: ChildProps) => {
  useEffect(() => {
    console.info('Child re-renders');
    onChange();
  });
  return <div>Some Child</div>
}

const ChildMemo = React.memo(Child);

const useForm = () => {
  const submit = () => {
    console.info('do something on submit');
  };

  return {
    submit,
  };
};

function App() {
  const [state, setState] = useState(1);

  const onChangeMemo = useCallback(() => {
    console.info('On change callback');
  }, [])

  const { submit } = useForm();

  return (
    <>
      Examples of a function non-memoized and memoized via useCallback or useMemo
      <br />
      <br />
      <Button onClick={() => setState(state + 1)}>Click to trigger re-render {state}</Button>
      <br />
      <br />
      <h3>Child component is not memoized here</h3>
      <p>So it will re-render when the button is clicked, even those it's onChange prop is memoized</p>
      <Child onChange={onChangeMemo} />
      <h3>This component is memoized</h3>
      <p>So it won't re-render when the button clicked</p>
      <ChildMemo onChange={submit} />
      
    </>
  )
}

export default App
