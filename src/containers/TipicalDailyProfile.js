import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import TipicalDailyProfileChart from '../components/TipicalDailyProfile/TipicalDailyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import { getDailyProfile } from '../services/api'

const Widget = styled.div`
    min-height: 220px;
    padding: 4px 4px 4px 24px;
    background-color: #f2f2f2;
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

function TipicalDailyProfile (props) {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDailyProfile(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <CounterWrapper>
            <Counter title="Mitjana diària" value={data?.dailyAvg?.value} date="" />
          </CounterWrapper>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            isLoading
              ? 'Loading...'
              : <TipicalDailyProfileChart data={data?.dailyTypicalProfile} />
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
            <DistributionByUserType contract={contract} />
          </Widget>
        </div>
        <div className="col-xs-12 col-md-6">
          <Widget>
            <DistributionByPeriod contract={contract} />
          </Widget>
        </div>
      </div>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalDailyProfile
