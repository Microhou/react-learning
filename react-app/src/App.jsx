import { useState, useEffect } from "react";

import Father from "./Father";
import Child from "./Child";
// import ModalDialog from './ModalDialog';
import DataDisplayer from './DataDisplayer';
import MyApp from './ButtonProvider';
import TaskApp from './TaskApp';
import ScrollableWithMovingBlock from './components/ScrollableWithMovingBlock';
import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import ModalDialog from './components/ModalDialog';
import Button from "./components/Button";
import IconButtonExample from './components/IconButton';
import ResizeDetector from './components/ResizeDetector';
import './App.css'

const SomeFormHere = () => <div> some form here</div>;
const SubmitButton = () => <button className="button">Submit button</button>;
const CancelButton = () => <button className="button secondary">Cancel button</button>;

function App() {

  // const [show, setShow] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  useEffect(() => {
    console.log('App');
  }, [])

  // race condition
  const [currentId, setCurrentId] = useState(1);

  const handleClick = () => {
    const idToFetch = Math.round(Math.random() * 80);
    setCurrentId(idToFetch)
  }

  return (
    <>
      {/* <Father>
          <Child />
      </Father>
      <button onClick={() => setShow(true)}>
        Open dialog
      </button>
      <ModalDialog isOpen={show}>
        Hello there!
        <br />
        <button onClick={() => {
          setShow(false);
        }}>Close</button>
      </ModalDialog> */}
      
      <div>
        {currentId ? <p>Latest requested ID: {currentId}</p> : null}

        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>
      <hr />
      {currentId ? <DataDisplayer id={currentId} /> : null}

      <MyApp/>
      <TaskApp />
      <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
      </ScrollableWithMovingBlock>
      <h4>Dialog with content and one button in the footer</h4>
      <Button onClick={() => setIsOpen1(true)}>Open dialog one</Button>
      {
        isOpen1 && (
          <ModalDialog footer={<SubmitButton />} onClose={() => setIsOpen1(false)}><SomeFormHere /></ModalDialog>
        )
      }
      {/* <IconButtonExample /> */}
      <ResizeDetector />
    </>
  )
}

export default App
