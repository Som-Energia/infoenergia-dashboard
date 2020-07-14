import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import TipicalWeeklyProfileChart from '../components/TipicalWeeklyProfile/TipicalWeeklyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import { getWeeklyProfile } from '../services/api'

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
  font-size: 2.2rem;
  font-weight: bold;
  white-space: nowrap;
`

const ChartWrapper = styled.div`
  width: 100%;
`

const TipicalWeeklyProfile = (props) => {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWeeklyProfile(contract)
      .then(response => {
        console.log(response)
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      <CounterWrapper>
        <Counter title="Mitjana setmanal" value={data?.value} date="" />
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
        {
          isLoading
            ? 'Loading...'
            : <TipicalWeeklyProfileChart data={{ avgWeekCCH: data?.avgWeekCCH, formatAvgWeekCCH: data?.formatAvgWeekCCH }} />
        }
      </ChartWrapper>
      <WeeklyMediumWrapper>
        <DailyMediumWrapper>
          <MediumValue>{data?.weekValue} kWh</MediumValue>
          <span>Mitjana d'ús d'energia en dia entre setmana</span>
        </DailyMediumWrapper>
        <WeekendMediumWrapper>
          <MediumValue>{data?.weekendValue} kWh</MediumValue>
          <span>Mitjana d'ús d'energia en dia cap de setmana</span>
        </WeekendMediumWrapper>
      </WeeklyMediumWrapper>
      <LastUpdate />
    </>
  )
}

export default TipicalWeeklyProfile
