import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DevelopmentIndex from './pages/DevelopmentIndex'
import CssBaseline from '@mui/material/CssBaseline'
import { GenerationUseContextProvider } from './contexts/GenerationUseContext'
import { LocalizationProvider as DatePickerLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'

import i18n from './i18n/i18n'
import './App.css'

function App(props) {
  const generationAssignments = document.getElementById(
    'generation-assignments-data'
  )
  const assignmentsConsumption = generationAssignments
    ? JSON.parse(generationAssignments.textContent)
    : {}

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
        <ProductionConsumption {...props} />
      </GenerationUseContextProvider>
    )
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DatePickerLocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={i18n}
          >
            <Suspense fallback={<></>}>
              <Router
                future={{
                  v7_relativeSplatPath: true,
                  v7_startTransition: true,
                }}
              >
                <Routes>
                  <Route exact path="/" element={<DevelopmentIndex />}></Route>
                  <Route
                    exact
                    path="/:language/infoenergy"
                    element={loadTimeCurves()}
                  />
                  <Route
                    path="/:language/infoenergy/energy-use"
                    element={loadEnergyUse()}
                  />
                  <Route
                    path="/:language/investments/production-consumption"
                    element={loadGenerationKwh()}
                  />
                </Routes>
              </Router>
            </Suspense>
          </DatePickerLocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d8f22', // changed from #96b633 by MUI's recomendation (warn)
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
    htmlFontSize: 14,
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#fff',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#6d8f22',
          border: '1px solid',
          backgroundColor: '#6d8f22',
        }
      }
    }
  }
})
