import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import EnergyUse from './pages/EnergyUse'
import TimeCurves from './pages/TimeCurves'

import './App.css'

function App () {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route exact path="/" component={EnergyUse} />
          <Route path="/us-energia" component={EnergyUse} />
          <Route path="/corbes-horaries" component={TimeCurves} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  )
}

export default App
