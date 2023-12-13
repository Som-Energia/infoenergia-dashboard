import React from 'react'
import RightsManage from './RightsManage'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, queryByAttribute } from '@testing-library/react'
import { GenerationUseContextProvider } from 'contexts/GenerationUseContext'

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

describe('Generic Component Rights Manage', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const id = 'children-comp'
  const CHILDREN_TEXT = 'CHILDREN'
  const loadingId = 'loading-comp-id'

  test('Should show the children component', () => {
    const lang = 'ca'

    const dom = render(
      <MemoryRouter
        initialEntries={[`/${lang}/investments/production-consumption`]}
      >
        <Route exact path="/:language/investments/production-consumption">
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <RightsManage>
              <div id={id}>{CHILDREN_TEXT}</div>
            </RightsManage>
          </GenerationUseContextProvider>
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
          <GenerationUseContextProvider initViewTypeValue={0} isTestMode={true}>
            <RightsManage isLoading={true}>
              <div id={id}>{CHILDREN_TEXT}</div>
            </RightsManage>
          </GenerationUseContextProvider>
        </Route>
      </MemoryRouter>
    )

    const childElement = getById(dom.container, id)
    expect(childElement).toBeNull()
    const loadingComponent = getById(dom.container, loadingId)
    expect(loadingComponent).toBeInTheDocument()
    
  })
})
