import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import EnergyUse from './pages/EnergyUse'
import TimeCurves from './pages/TimeCurves'

import './i18n/i18n'
import './App.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96b633'
    },
    secondary: {
      main: '#a1a1a1'
    },
    contrastThreshold: 2,
    tonalOffset: 0.2
  },
  typography: {
    color: '#4d4d4d',
    htmlFontSize: 16
  },
  shape: {
    borderRadius: '0'
  }
})

function App (props) {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Switch>
            <Route exact path="/">
              <EnergyUse {...props} />
            </Route>
            <Route path="/us-energia">
              <EnergyUse {...props} />
            </Route>
            <Route path="/corbes-horaries">
              <TimeCurves {...props} />
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default App
