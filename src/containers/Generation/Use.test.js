import React from 'react'
import Use from './Use'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { GenerationUseContextProvider } from 'contexts/GenerationUseContext'
import { consumption } from './mockData/AssignmentsConsumption'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayJsUtils from '@date-io/dayjs'

jest.mock('react-i18next', () => ({
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

export function formatMMYYYY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based, so add 1
  const year = date.getFullYear().toString()

  return `${month}/${year}`
}

describe('Generation use section', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const mockHandleDateChange = jest.fn()
  const mockHandleViewTypeChange = jest.fn()
  const mockAssignmentsTableFormat = consumption
  const mockSelectedDate = new Date()
  const MONTH = 'month'
  const YEAR = 'year'

  test('Should be the value month in select element', () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <GenerationUseContextProvider
              initViewTypeValue={0}
              isTestMode={true}
            >
              <Use
                handleViewTypeChange={mockHandleViewTypeChange}
                handleDateChange={mockHandleDateChange}
                assignmentsTableFormat={mockAssignmentsTableFormat}
                selectedDate={mockSelectedDate}
                viewTypeValue={MONTH}
              />
            </GenerationUseContextProvider>
          </MuiPickersUtilsProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue(MONTH)
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_MONTH')
  })

  test('Should be the value year in select element', () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <GenerationUseContextProvider
              initViewTypeValue={1}
              isTestMode={true}
            >
              <Use
                handleViewTypeChange={mockHandleViewTypeChange}
                handleDateChange={mockHandleDateChange}
                assignmentsTableFormat={mockAssignmentsTableFormat}
                selectedDate={mockSelectedDate}
                viewTypeValue={YEAR}
              />
            </GenerationUseContextProvider>
          </MuiPickersUtilsProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue(YEAR)
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_YEAR')
  })

  test('Should change the type of viewdata', () => {
    const lang = 'ca'

    const mockSetViewTypeValue = jest.fn()

    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <GenerationUseContextProvider
              initViewTypeValue={0}
              isTestMode={true}
              setViewTypeValue={mockSetViewTypeValue}
            >
              <Use
                handleViewTypeChange={mockHandleViewTypeChange}
                handleDateChange={mockHandleDateChange}
                assignmentsTableFormat={mockAssignmentsTableFormat}
                selectedDate={mockSelectedDate}
                viewTypeValue={YEAR}
              />
            </GenerationUseContextProvider>
          </MuiPickersUtilsProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    const optionToSelect = YEAR // Change to the option you want to select
    act(() => {
      userEvent.selectOptions(selectElement, optionToSelect)
    })
    expect(mockHandleViewTypeChange).toHaveBeenCalledTimes(1)
  })

  test('Should show loading component', async () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <GenerationUseContextProvider isTestMode={true} isloadingUse={true}>
              <Use
                handleViewTypeChange={mockHandleViewTypeChange}
                handleDateChange={mockHandleDateChange}
                assignmentsTableFormat={mockAssignmentsTableFormat}
                selectedDate={mockSelectedDate}
                loading={true}
              />
            </GenerationUseContextProvider>
          </MuiPickersUtilsProvider>
        </Route>
      </MemoryRouter>
    )
    const loadingComponent = getById(dom.container, 'loading-use-id')
    expect(loadingComponent).toBeInTheDocument()
  })
})
