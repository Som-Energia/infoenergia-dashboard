import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'
import CalendarMonth from '../components/LastMonthsProfile/CalendarMonth'

import { getMonthsProfile } from '../services/api'

const ChartWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  column-gap: 32px;
  min-height: 283px;
  margin-top: 16px;
`

const TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const CounterWrapper = styled.div`
  padding-top: 4px;
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

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 283px;
  font-weight: 400;
`

function LastMonthProfile (props) {
  const { contract, token } = props
  const [data, setData] = useState({})
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  const legendData = [
    { color: '#96b633', label: t('USE_REGULAR') },
    { color: '#f2970f', label: t('USE_EXCEPTIONAL') },
    { color: '#616161', label: t('USE_LOW') }
  ]

  useEffect(() => {
    getMonthsProfile(contract, token)
      .then(response => {
        setData(response)
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [contract, token])

  return (
    <>
      <TopWrapper>
        <LegendWrapper>
          {
            legendData.map(item => (
              <LegendItem key={item.label}>
                <LegendColor color={item.color} />
                <LegendLabel>
                  { t('ENERGY_USE') }
                  <div>{item.label}</div>
                </LegendLabel>
              </LegendItem>
            ))
          }
        </LegendWrapper>
        <CounterWrapper>
          <Counter
            title={t('STAND_DAILY_USE')}
            value={ data?.levels ? data?.levels[1]?.kWh : '-'}
            date={t('LAST_3_MONTHS')}
          />
        </CounterWrapper>

      </TopWrapper>
      <ChartWrapper>
        {
          isLoading
            ? <>
              <Skeleton height="100%" />
              <Skeleton height="100%" />
              <Skeleton height="100%" />
            </>
            : data?.months
              ? data?.months.map((month, idx) => (
                  <div key={idx}>
                    <CalendarMonth month={month} consum={data?.consumption} levels={data?.levels} />
                  </div>
                )).reverse()
              : data?.errors
                ? <NoDataMessage>{t(data.errors)}</NoDataMessage>
                : <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
        }
      </ChartWrapper>
      <LastUpdate date={data?.updated} />
    </>

  )
}

export default LastMonthProfile
