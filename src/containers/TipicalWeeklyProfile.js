import React, { useState } from 'react'
import styled from 'styled-components'

import TipicalWeeklyProfileChart from '../components/TipicalWeeklyProfile/TipicalWeeklyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import mockData from '../services/TipicalWeeklyProfileMock'

const CounterWrapper = styled.div`
  padding-top: 24px;
`

const DayTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

const WeeklyMediumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`

const MediumWrapper = styled.div`
    padding: 4px 4px;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    color: #585857;
    span {
      line-height: 1.5rem;
    }
`

const DayTypeWrapperDaily = styled(MediumWrapper)`
  width: 70%;
  padding: 4px 8px;
  font-weight: 500;
`

const DayTypeWrapperWeekend = styled(MediumWrapper)`
  width: 29%;
  padding: 4px 8px;
  font-weight: 500;
`

const DailyMediumWrapper = styled(MediumWrapper)`
  width: 70%;
  background-color: #96b633;
  color: #ffffff;
`

const WeekendMediumWrapper = styled(MediumWrapper)`
  width: 29%;
`

const MediumValue = styled.div`
  padding: 0 8px;
  font-size: 3rem;
  font-weight: bold;
`

const ChartWrapper = styled.div`
  width: 100%;
`

function TipicalWeeklyProfile () {
  const [data, setData] = useState(mockData)

  return (
    <>
      <CounterWrapper>
        <Counter title="Mitjana setmanal" value={data?.mitjana_semanal?.valor} date="" />
      </CounterWrapper>
      <DayTypeWrapper>
        <DayTypeWrapperDaily>
          Entre setmana
        </DayTypeWrapperDaily>
        <DayTypeWrapperWeekend>
          Cap de setmana
        </DayTypeWrapperWeekend>
      </DayTypeWrapper>
      <ChartWrapper>
        <TipicalWeeklyProfileChart data={data?.mitjana_semanal} />
      </ChartWrapper>
      <WeeklyMediumWrapper>
        <DailyMediumWrapper>
          <MediumValue>5kWh</MediumValue>
          <span>Mitjana d'ús d'energia en dia entre setmana</span>
        </DailyMediumWrapper>
        <WeekendMediumWrapper>
          <MediumValue>3kWh</MediumValue>
          <span>Mitjana d'ús d'energia en dia cap de setmana</span>
        </WeekendMediumWrapper>
      </WeeklyMediumWrapper>
      <LastUpdate />
    </>
  )
}

export default TipicalWeeklyProfile
