import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function createElement(type, props, ...children) {
  return {
      type,
      props: {
          ...props,
          children: children.map(child => typeof child === 'object' ? child : createTextElement(child)),
      }
  }
}

function createTextElement(text) {
return {
  type: "TEXT_ELEMENT",
  props: {
      nodeValue: text,
      children: []
  }
}
}

const Didact = {
createElement
}

const elementDiv = Didact.createElement(
'div',
{id: 'foo'},
Didact.createElement('a', null, 'bar'),
Didact.createElement('b')
)

/** @jsx Didact.createElement */



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
