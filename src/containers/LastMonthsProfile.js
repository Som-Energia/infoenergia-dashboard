import React, { useState } from 'react'
import styled from 'styled-components'

import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'
import CalendarMonth from '../components/LastMonthsProfile/CalendarMonth'
import SeasonalProfile from '../containers/SeasonalProfile'
import mockData from '../services/LastMonthsProfile'

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
  font-size: 1.35rem;
  line-height: 1.5rem;
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

function LastMonthProfile () {
  const [data, setData] = useState(mockData)

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
          <Counter title="Ús diari habitual" value={data?.levels[0].kWh} date="Últims 3 mesos" />
        </CounterWrapper>

      </TopWrapper>
      <ChartWrapper>
        {
          data?.months &&
          data?.months.map((month, idx) => (
            <div key={idx}>
              <CalendarMonth month={month} consum={data?.months?.consum} />
            </div>
          ))
        }
      </ChartWrapper>
      <LastUpdate />
    </>

  )
}

export default LastMonthProfile
