import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import moment from 'moment'
import 'moment/locale/ca'

moment.locale('ca')

const root = document.getElementById('root')
const props = {}

if (root) {
  const attrs = Object.keys(root.dataset)
  attrs.forEach(
    (name) => { props[name] = root.dataset[name] }
  )

  ReactDOM.render(
    <>
      <App {...props} />
    </>,
    document.getElementById('root')
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
