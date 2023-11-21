import { useState, useEffect } from "react";

import Father from "./Father";
import Child from "./Child";
import ModalDialog from './ModalDialog';
import DataDisplayer from './DataDisplayer';
import './App.css'

function App() {

  // const [show, setShow] = useState(false);

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
    </>
  )
}

export default App
