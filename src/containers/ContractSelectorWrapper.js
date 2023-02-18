import React, { useState } from 'react'

const contractList = JSON.parse(
  document.getElementById('contracts-data').textContent
)
const contracts = Object.assign(
  {},
  ...contractList.map((item) => ({ [item.name]: item }))
)
const contractNames = contractList.map((contract) => contract.name)

function ContractSelectorWrapper({ children }) {
  const [currentContract, setCurrentContract] = useState(contractList[0])

  return (
    <>
      <section className="section infoenergy container">
        <section className="pageHeader">
          <div className="row">
            <div className="col-12 col-md-7">
              <img src={process.env.PUBLIC_URL + '/infoenergy_box.svg'} />
              <b> {'trans Curvas horarias'} </b>
            </div>
            <div className="col-12 col-md-5">
              <div className="container-contract-selector">
                <form action="" id="contract-selector-form">
                  <label htmlFor="contract-selector">
                    {'trans Estáis modificando el contrato'}
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
          {/* {% if empowering_token and contratos %} */}
          <div>{children}</div>
          {/* {% elif not contratos %} */}
          <p className="warning">
            {'trans Actualmente, no tiene contratos activos.'}
          </p>
          {/* {% else %} */}
          <p className="warning">
            {
              'trans Su usuario no dispone de los datos necesarios para acceder a esta sección, puedes contactar con nosotros para mas información.'
            }
          </p>
          {/* {% endif %} */}
          <p style={{ display: 'none' }} id="no-data">
            {'trans No hay curvas horarias para el contrato seleccionado'}.
          </p>
          <p style={{ display: 'none' }} id="no-allow">
            {
              'trans Su usuario no dispone de los datos necesarios para acceder a esta sección, puedes contactar con nosotros para mas información.'
            }
          </p>
          <p style={{ display: 'none' }} id="tarifa-30">
            {
              'trans Este contrato tiene una tarifa 3.0 con menos de 50 kW de potencia contratada. Las empresas de distribución no comparten los datos horarios de uso de energía de estos contratos, porque la normativa no les obliga a hacerlo. Por este motivo no disponemos de esta información y no podemos ofrecértela en este espacio.'
            }
          </p>
        </section>
      </section>
    </>
  )
}

export default ContractSelectorWrapper
