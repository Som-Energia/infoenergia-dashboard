import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')
const props = {}

if (root) {
  const attrs = Object.keys(root.dataset)
  attrs.forEach((name) => {
    props[name] = root.dataset[name]
  })

  console.log(`infoenergia version: ${import.meta.env.VITE_APP_VERSION}`)

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
