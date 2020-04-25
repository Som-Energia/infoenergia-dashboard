import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import TipicalWeeklyProfileChart from '../components/TipicalWeeklyProfile/TipicalWeeklyProfileChart'
import Counter from '../components/Counter'

import mockData from '../services/TipicalWeeklyProfileMock'

const CounterWrapper = styled.div`
  padding-top: 16px;
`

function TipicalDailyProfile () {
  const [data, setData] = useState({ ...mockData })

  return (
    <React.Fragment>
      <CounterWrapper>
        <Counter title="Mitjana setmanal" value={data?.mitjana_semanal?.valor} date="" />
      </CounterWrapper>
      <div className="row">
        <div className="col-xs-12">
          <TipicalWeeklyProfileChart data={data?.mitjana_semanal} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-9">
          <span>5kWh</span>
          <span>Mitjana d'ús d'energia en dia entre setmana</span>
        </div>
        <div className="col-xs-3">
          <span>3kWh</span>
          <span>Mitjana d'ús d'energia en dia cap de setmana</span>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 text-right">
          Darrera actualització: {moment().format('DD/MM/YYYY')}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TipicalDailyProfile
