import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayJsUtils from '@date-io/dayjs'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import './i18n/i18n'
import './App.css'

function App(props) {
  const loadEnergyUse = () => {
    const EnergyUse = lazy(() => import('./pages/EnergyUse'))
    return <EnergyUse {...props} />
  }

  const loadTimeCurves = () => {
    const TimeCurves = lazy(() => import('./pages/TimeCurves'))
    return <TimeCurves {...props} />
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <Suspense fallback={<></>}>
          <Router>
            <Switch>
              <Route exact path="/" render={loadEnergyUse} />
              <Route
                exact
                path="/:language/infoenergy"
                render={loadTimeCurves}
              />
              <Route
                path="/:language/infoenergy/energy-use"
                render={loadEnergyUse}
              />
            </Switch>
          </Router>
        </Suspense>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default App

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96b633',
    },
    secondary: {
      main: '#a1a1a1',
    },
    contrastThreshold: 2,
    tonalOffset: 0.2,
  },
  typography: {
    color: '#4d4d4d',
    htmlFontSize: 16,
  },
  shape: {
    borderRadius: '0',
  },
})
