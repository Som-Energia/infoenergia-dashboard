import React from 'react'
import Record from './Record'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute } from '@testing-library/react'
import mockCurves from './mockData/Remaining' // TODO: change this var with kwh record
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

describe('Record section of GenerationkWh', () => {
  const mockHandleDateChange = vi.fn()
  const mockHandleViewTypeChange = vi.fn()
  const mockSelectedDate = new Date()
  const MONTH = 'month'

  const getById = queryByAttribute.bind(null, 'id')
  test('Should show the loading component', async () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Record
              handleViewTypeChange={mockHandleViewTypeChange}
              handleDateChange={mockHandleDateChange}
              selectedDate={mockSelectedDate}
              viewTypeValue={MONTH}
              loading={true}
              kWhRecord={mockCurves}
            />
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )
    const loadingComponent = getById(dom.container, 'record-loading-component')
    expect(loadingComponent).toBeInTheDocument()
  })

  test('Should show the chart component', async () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Record
              handleViewTypeChange={mockHandleViewTypeChange}
              handleDateChange={mockHandleDateChange}
              selectedDate={mockSelectedDate}
              viewTypeValue={MONTH}
              loading={false}
              kWhRecord={mockCurves}
            />
          </LocalizationProvider>
        </Route>
      </MemoryRouter>
    )
    const loadingComponent = getById(dom.container, 'record-loading-component')
    expect(loadingComponent).toBeNull()
    const chartComponent = getById(dom.container, 'record-chart-component')
    expect(chartComponent).toBeInTheDocument()
  })
})
