import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'
import CalendarMonth from '../components/LastMonthsProfile/CalendarMonth'

import { getMonthsProfile } from '../services/api'

const ChartWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  column-gap: 32px;
`

const TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const CounterWrapper = styled.div`
  padding-top: 24px;
`

const LegendWrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 24px;
  padding-bottom: 8px;
`

const LegendColor = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  background-color: ${props => props.color};
`

const LegendLabel = styled.div`
  font-size: 1rem;
  line-height: 1.2rem;
  white-space: nowrap;
  div {
    text-transform: uppercase;
    font-weight: 500;
  }
`

const legendData = [
  { color: '#96b633', label: 'habitual' },
  { color: '#f2970f', label: 'excepcional' },
  { color: '#616161', label: 'nul. permanent' }
]

function LastMonthProfile (props) {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMonthsProfile(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      <TopWrapper>
        <LegendWrapper>
          {
            legendData.map(item => (
              <LegendItem key={item.label}>
                <LegendColor color={item.color} />
                <LegendLabel>
                  Ús d'energia
                  <div>{item.label}</div>
                </LegendLabel>
              </LegendItem>
            ))
          }
        </LegendWrapper>
        <CounterWrapper>
          <Counter title="Ús diari habitual" value={ data?.levels ? data?.levels[1].kWh : '-'} date="Últims 3 mesos" />
        </CounterWrapper>

      </TopWrapper>
      <ChartWrapper>
        {
          isLoading
            ? 'Loading ...'
            : (
              data?.months &&
              data?.months.map((month, idx) => (
                <div key={idx}>
                  <CalendarMonth month={month} consum={data?.consumption} levels={data?.levels} />
                </div>
              ))
            )
        }
      </ChartWrapper>
      <LastUpdate date={data?.updated} />
    </>

  )
}

export default LastMonthProfile
