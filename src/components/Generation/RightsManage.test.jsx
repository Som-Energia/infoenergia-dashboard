import React from 'react'
import RightsManage from './RightsManage'
import { MemoryRouter, Route } from 'react-router-dom'
import {
  render,
  queryByAttribute,
} from '@testing-library/react'
import { GenerationUseContextProvider } from '../../contexts/GenerationUseContext'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
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

function formatMMYYYY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based, so add 1
  const year = date.getFullYear().toString()

  return `${month}/${year}`
}

describe('Generic Component Rights Manage', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const id = 'children-comp'
  const CHILDREN_TEXT = 'CHILDREN'
  const loadingId = 'loading-comp-id'
  const mockHandleDateChange = vi.fn()
  const mockHandleViewTypeChange = vi.fn()
  const mockHandlePeriodChange = vi.fn()
  const mockPeriods = 'Taula_Peatges_20'
  const mockSelectedDate = new Date()
  const mockViewTypeValueMonth = 'month'
  const mockViewTypeValueYear = 'year'
  const mockTotal = 3000

  test('Should show the children component', () => {
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
              <RightsManage isLoading={false} selectedDate={mockSelectedDate}>
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const childElement = getById(dom.container, id)
    expect(childElement).toHaveTextContent(CHILDREN_TEXT)
  })

  test('Should show the loading component', () => {
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
              <RightsManage isLoading={true}>
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const childElement = getById(dom.container, id)
    expect(childElement).toBeNull()
    const loadingComponent = getById(dom.container, loadingId)
    expect(loadingComponent).toBeInTheDocument()
  })

  test('Should show the selected Date when type is MONTH', () => {
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
              <RightsManage
                handleDateChange={mockHandleDateChange}
                handleViewTypeChange={mockHandleViewTypeChange}
                handlePeriodChange={mockHandlePeriodChange}
                periods={mockPeriods}
                isLoading={false}
                selectedDate={mockSelectedDate}
                viewTypeValue={mockViewTypeValueMonth}
                total={mockTotal}
              >
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const stringData = formatMMYYYY(mockSelectedDate)
    const inputDate = getById(dom.container, 'month-picker')
    expect(inputDate.value).toBe(stringData)
  })

  test('Should show the selected Date when type is YEAR', () => {
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
              <RightsManage
                handleDateChange={mockHandleDateChange}
                handleViewTypeChange={mockHandleViewTypeChange}
                handlePeriodChange={mockHandlePeriodChange}
                periods={mockPeriods}
                isLoading={false}
                selectedDate={mockSelectedDate}
                viewTypeValue={mockViewTypeValueYear}
                total={mockTotal}
              >
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const stringData = mockSelectedDate.getFullYear().toString()
    const inputDate = getById(dom.container, 'year-picker')
    expect(inputDate.value).toBe(stringData)
  })

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
              <RightsManage
                handleDateChange={mockHandleDateChange}
                handleViewTypeChange={mockHandleViewTypeChange}
                handlePeriodChange={mockHandlePeriodChange}
                periods={mockPeriods}
                isLoading={false}
                selectedDate={mockSelectedDate}
                viewTypeValue={mockViewTypeValueMonth}
                total={mockTotal}
              >
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue('month')
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_YEAR')
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
              initViewTypeValue={0}
              isTestMode={true}
            >
              <RightsManage
                handleDateChange={mockHandleDateChange}
                handleViewTypeChange={mockHandleViewTypeChange}
                handlePeriodChange={mockHandlePeriodChange}
                periods={mockPeriods}
                isLoading={false}
                selectedDate={mockSelectedDate}
                viewTypeValue={mockViewTypeValueYear}
                total={mockTotal}
              >
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue('year')
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_MONTH')
  })

  test('Should change the type of viewdata from year to month', () => {
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
              <RightsManage
                handleDateChange={mockHandleDateChange}
                handleViewTypeChange={mockHandleViewTypeChange}
                handlePeriodChange={mockHandlePeriodChange}
                periods={mockPeriods}
                isLoading={false}
                selectedDate={mockSelectedDate}
                viewTypeValue={mockViewTypeValueYear}
                total={mockTotal}
              >
                <div id={id}>{CHILDREN_TEXT}</div>
              </RightsManage>
            </GenerationUseContextProvider>
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    const optionToSelect = 'month' // Change to the option you want to select
    act(() => {
      userEvent.selectOptions(selectElement, optionToSelect)
    })
    expect(mockHandleViewTypeChange).toHaveBeenCalled()
  })
})
