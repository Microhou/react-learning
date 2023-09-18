import { useEffect } from "react";

import Father from "./Father";
import Child from "./Child";
import './App.css'

function App() {
  useEffect(() => {
    console.log('App');
  }, [])

  return (
    <>
      <Father>
          <Child />
      </Father>
    </>
  )
}

export default App
