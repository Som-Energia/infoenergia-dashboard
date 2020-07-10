import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import TipicalDailyProfileChart from '../components/TipicalDailyProfile/TipicalDailyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import mockData from '../services/TipicalDailyProfileMock'

import { getDailyProfile } from '../services/api'

const Widget = styled.div`
    min-height: 220px;
    padding: 4px 4px 4px 24px;
    background-color: #f2f2f2;
    margin-bottom: 16px;
    h3 {
      white-space: nowrap;
    }
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  margin: 16px 0;
  padding: 12px;
  &.text-right {
    justify-content: flex-end;
  }
  .vall {
    width: 20px;
    height: 4px;
    display: inline-block;
    margin: 0 4px;
    background-color: #96b633;
  }
  .punta {
    width: 20px;
    height: 4px;
    display: inline-block;
    margin: 0 8px;
    background-color: #f2970f;
  }
`
const CounterWrapper = styled.div`
  padding-top: 24px;
`

function TipicalDailyProfile () {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDailyProfile('100')
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <CounterWrapper>
            <Counter title="Mitjana diària" value={data?.mitjana_diaria?.valor} date="" />
          </CounterWrapper>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            isLoading
              ? 'Loading...'
              : <TipicalDailyProfileChart data={data?.perfil_tipic_diari} />
          }
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Legend className="col-xs-12 col-md-6 text-right">
            <b>Hivern:</b> <span className="vall"></span> Vall 22h a 12h <span className="punta"></span> Punta 12h a 22h
          </Legend>
          <Legend className="col-xs-12 col-md-6">
            <b>Estiu:</b> <span className="vall"></span> Vall 23h a 13h <span className="punta"></span> Punta 13h a 23h
          </Legend>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Widget>
            <DistributionByUserType />
          </Widget>
        </div>
        <div className="col-xs-12 col-md-6">
          <Widget>
            <DistributionByPeriod />
          </Widget>
        </div>
      </div>
      <LastUpdate />
    </>
  )
}

export default TipicalDailyProfile
