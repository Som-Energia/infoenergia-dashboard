import React from 'react'
import Use from './Use'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { GenerationUseContextProvider } from '../../contexts/GenerationUseContext'
import { consumption } from './mockData/AssignmentsConsumption'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { vi } from 'vitest'

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
  const getById = queryByAttribute.bind(null, 'id')
  const mockHandleDateChange = vi.fn()
  const mockHandleViewTypeChange = vi.fn()
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue(YEAR)
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_YEAR')
  })

  test('Should change the type of viewdata', () => {
    const lang = 'ca'

    const mockSetViewTypeValue = vi.fn()

    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GenerationUseContextProvider isTestMode={true} isloadingUse={true}>
              <Use
                handleViewTypeChange={mockHandleViewTypeChange}
                handleDateChange={mockHandleDateChange}
                assignmentsTableFormat={mockAssignmentsTableFormat}
                selectedDate={mockSelectedDate}
                loading={true}
              />
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )
    const loadingComponent = getById(dom.container, 'loading-use-id')
    expect(loadingComponent).toBeInTheDocument()
  })
})
