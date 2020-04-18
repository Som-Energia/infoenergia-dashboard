import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import UsEnergia from './pages/UsEnergia'

import './App.css'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UsEnergia} />
        <Route path="/us-energia" component={UsEnergia} />
        <Route path="/corbes-horaries" component={UsEnergia} />
      </Switch>
    </Router>
  )
}

export default App
