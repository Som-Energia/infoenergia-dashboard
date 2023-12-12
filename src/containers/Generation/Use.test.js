import React from 'react'
import Use from './Use'
import { MemoryRouter, Route } from 'react-router-dom'
import {
  render,
  queryByAttribute,
  screen,
  fireEvent,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { GenerationUseContextProvider } from 'contexts/GenerationUseContext'
import { consumption } from './mockData/AssignmentsConsumption'

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
}))

export function formatMMYYYY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based, so add 1
  const year = date.getFullYear().toString()

  return `${month}/${year}`
}

describe('Generation use section', () => {
  const getById = queryByAttribute.bind(null, 'id')

  test('Should be the value 0 in select element', () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <Use />
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue('0')
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_MONTH')
  })

  test('Should be the value 1 in select element', () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={1} isTestMode={true}>
            <Use />
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    expect(selectElement).toHaveValue('1')
    expect(selectElement).toHaveTextContent('GENERATION_KWH_SELECT_YEAR')
  })

  test('Pick some month', () => {
    const lang = 'ca'
    const date = new Date()
    const monthAbbreviation = date.toLocaleString(lang, { month: 'short' })
  
    const dateFormatted = formatMMYYYY(date)
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <Use />
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    // Find the DatePicker input field
    const datePickerInput = getById(dom.container, 'month-picker')

    // Simulate clicking the input to open the date picker
    fireEvent.click(datePickerInput)

    // Find the month you want to select
    const selectedMonth = screen.getByText(monthAbbreviation) // Replace with the day you want to select

    // Click the selected day to choose it
    fireEvent.click(selectedMonth)

    // Optionally, assert that the input field displays the selected date
    expect(datePickerInput).toHaveValue(dateFormatted) //
  })

  test('Should change the type of viewdata', () => {
    const lang = 'ca'

    const mockSetViewTypeValue = jest.fn()

    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider
            initViewTypeValue={0}
            isTestMode={true}
            setViewTypeValue={mockSetViewTypeValue}
          >
            <Use />
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    const selectElement = getById(dom.container, 'type-view-select')
    const optionToSelect = '1' // Change to the option you want to select
    act(() => {
      userEvent.selectOptions(selectElement, optionToSelect)
    })

    expect(selectElement).toHaveValue(optionToSelect)
  })

  test('Should show the list of consumption', () => {
    const lang = 'ca'

    const mockSetViewTypeValue = jest.fn()

    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider
            initViewTypeValue={0}
            isTestMode={true}
            setViewTypeValue={mockSetViewTypeValue}
            initAssignmentsTableFormat={consumption}
          >
            <Use />
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )


    const tableBody = getById(
      dom.container,
      'table-body-assignment-consumption'
    )
    const tableRows = screen.getAllByRole('row') // Assuming your rows have a role attribute set to 'row'

    // Perform assertions on the content
    expect(tableBody).toBeInTheDocument()
    expect(tableRows.length).toBeGreaterThan(0)

    const firstContentRow = tableRows[1]
    const firstCells = within(firstContentRow).getAllByRole('cell') // Assuming cells have a role attribute set to 'cell'
    const firstCellText = firstCells.map((cell) => cell.textContent)

    const arrayToCompare = consumption.rows.map(element => Object.values(element))

    // Replace 'expectedData' with the actual data you expect to be in that cell
    expect(firstCellText).toEqual(expect.arrayContaining(arrayToCompare[0]))
    
 })
})
