import React from 'react'
import KwhBag from './KwhBag'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute, waitFor } from '@testing-library/react'
import { GenerationUseContextProvider } from 'contexts/GenerationUseContext'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

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

describe('Generation use section', () => {
  const getById = queryByAttribute.bind(null, 'id')
  test('Should change the periods 3 to 6', async () => {
    const lang = 'ca'
    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <KwhBag lastInvoiceDatePriorityContract={new Date()} />
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
