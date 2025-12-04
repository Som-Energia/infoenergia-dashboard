import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevelopmentIndex from './pages/DevelopmentIndex'
import CssBaseline from '@mui/material/CssBaseline'
import { GenerationUseContextProvider } from './contexts/GenerationUseContext'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import './i18n/i18n'
import './App.css'


function App(props) {

  const generationAssignments = document.getElementById('generation-assignments-data')
  const assignmentsConsumption = generationAssignments ? JSON.parse(generationAssignments.textContent) : {};


  const loadEnergyUse = () => {
    const EnergyUse = lazy(() => import('./pages/EnergyUse'))
    return <EnergyUse {...props} />
  }

  const loadTimeCurves = () => {
    const TimeCurvesWrapper = lazy(() => import('./pages/TimeCurves'))
    return <TimeCurvesWrapper {...props} />
  }

  const loadGenerationKwh = () => {
    const ProductionConsumption = lazy(() =>
      import('./pages/ProductionConsumption')
    )
    return (
      <GenerationUseContextProvider
        generationAssignments={assignmentsConsumption}
      >
        <ProductionConsumption
          {...props}
        />
      </GenerationUseContextProvider>
    )
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Suspense fallback={<></>}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <DevelopmentIndex />
                  </Route>
                  <Route
                    exact
                    path="/:language/infoenergy"
                    render={loadTimeCurves}
                  />
                  <Route
                    path="/:language/infoenergy/energy-use"
                    render={loadEnergyUse}
                  />
                  <Route
                    path="/:language/investments/production-consumption"
                    render={loadGenerationKwh}
                  />
                </Switch>
              </Router>
            </Suspense>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d8f22',
    },
    secondary: {
      main: '#767676',
    },
    background: {
      default: '#f0f2f2',
      paper: '#ffffff',
    },
    contrastThreshold: 1,
    tonalOffset: 0.2,
  },
  typography: {
    htmlFontSize: 12,
  },
  shape: {
    borderRadius: 4,
  },
})