import React from 'react'
import KwhBag from './KwhBag'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute, waitFor } from '@testing-library/react'
import { GenerationUseContextProvider } from '../../contexts/GenerationUseContext'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import { createTheme, ThemeProvider } from '@mui/material/styles';

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}))

describe('Generation use section', () => {
const theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
          noSsr: true,
      },
    },
  },
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
  const getById = queryByAttribute.bind(null, 'id')
  test('Should change the periods 3 to 6', async () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <ThemeProvider theme={theme}>
              <KwhBag lastInvoiceDatePriorityContract={new Date()} />
            </ThemeProvider>
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'period-select')
    expect(selectElement).toHaveValue('Taula_Peatges_20')
    expect(selectElement).toHaveTextContent('GENERATION_SELECT_3_PERIODS')

    const optionToSelect = 'Taula_Peatges_30_60_Peninsular' // Change to the option you want to select
    act(() => {
      userEvent.selectOptions(selectElement, optionToSelect)
    })

    expect(selectElement).toHaveValue(optionToSelect)
  })
})
