import React, { useState, useEffect, createContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import infoenergyBox from 'images/infoenergy_box.svg'

import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

const empoweringToken = document.getElementById('root').dataset.token
const contractList = JSON.parse(
  document.getElementById('contracts-data').textContent
)
const contracts = Object.assign(
  {},
  ...contractList.map((item) => ({ [item.name]: item }))
)
const contractNames = contractList.map((contract) => contract.name)

export const ContractContext = createContext(null)

function ContractSelectorWrapper({ title, children }) {
  const [currentContract, setCurrentContract] = useState(contractNames[0])
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  return (
    <ContractContext.Provider value={contracts[currentContract]}>
      <section className="section infoenergy container">
        <section className="pageHeader">
          <div className="row">
            <div className="col-12 col-md-7">
              <img src={infoenergyBox} />
              <b> {t(title)} </b>
            </div>
            <div className="col-12 col-md-5">
              <div className="container-contract-selector">
                <form action="" id="contract-selector-form">
                  <label htmlFor="contract-selector">
                    {t('CURRENT_CONTRACT')}
                  </label>
                  <select
                    name="contract"
                    id="contract-selector"
                    value={currentContract}
                    onChange={(ev) => setCurrentContract(ev.target.value)}
                  >
                    {contractNames.map((key) => {
                      return (
                        <option value={key} key={key}>
                          {key} - {contracts[key].address}
                        </option>
                      )
                    })}
                  </select>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="section infoenergy-container container">
          {contractNames.length === 0 ? (
            <p className="warning" id="no-data">
              {t('ERROR_NO_ACTIVE_CONTRACTS')}
            </p>
          ) : !empoweringToken ? (
            <p className="warning" id="no-allow">
              {t('ERROR_NO_INFOENERGIA_TOKEN')}
            </p>
          ) : (
            <div>{children}</div>
          )}
          <p style={{ display: 'none' }} id="tarifa-30">
            {
              'trans Este contrato tiene una tarifa 3.0 con menos de 50 kW de potencia contratada. Las empresas de distribución no comparten los datos horarios de uso de energía de estos contratos, porque la normativa no les obliga a hacerlo. Por este motivo no disponemos de esta información y no podemos ofrecértela en este espacio.'
            }
          </p>
        </section>
      </section>
    </ContractContext.Provider>
  )
}

export default ContractSelectorWrapper
