import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@mui/material/Skeleton'

import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'
import CalendarMonth from '../components/LastMonthsProfile/CalendarMonth'
import { Widget } from '../containers/TipicalDailyProfile/DistributionCharts'

import { getMonthsProfile } from '../services/api'

const ChartWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  column-gap: 32px;
  min-height: 283px;
  margin-top: 4px;
`

const TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`
const CounterWrapper = styled.div`
  padding-top: 0px;
`

const LegendWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-wrap: wrap;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
`

const LegendColor = styled.span`
  font-size: 18px;
  text-transform: uppercase;
  color: ${(props) => props.color};
  font-weight: 700;
  padding-right: 16px;
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

function LastMonthProfile(props) {
  const { contract, token } = props
  const [data, setData] = useState({})
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  const legendData = [
    { color: '#96b633', label: t('USE_REGULAR') },
    { color: '#f2970f', label: t('USE_EXCEPTIONAL') },
    { color: '#616161', label: t('USE_LOW') },
  ]

  useEffect(() => {
    getMonthsProfile(contract, token)
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [contract, token])

  return (
    <>
      {' '}
      <Widget>
        <TopWrapper>
          <CounterWrapper>
            <Counter
              title={t('STAND_DAILY_USE')}
              value={data?.levels ? data?.levels[1]?.kWh : '-'}
              date={t('LAST_3_MONTHS')}
            />
          </CounterWrapper>
        </TopWrapper>
        <ChartWrapper>
          {isLoading ? (
            <>
              <Skeleton height="100%" />
              <Skeleton height="100%" />
              <Skeleton height="100%" />
            </>
          ) : data?.months ? (
            data?.months
              .map((month, idx) => (
                <div key={idx}>
                  <CalendarMonth
                    month={month}
                    consum={data?.consumption}
                    levels={data?.levels}
                  />
                </div>
              ))
              .reverse()
          ) : data?.errors ? (
            <NoDataMessage>{t(data.errors)}</NoDataMessage>
          ) : (
            <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
          )}
        </ChartWrapper>
        <LegendWrapper>
          <LegendLabel>
            {t('ENERGY_USE')}
            <LegendItem>
              {legendData.map((item) => (
                <LegendColor key={item.label} color={item.color}>
                  {item.label}
                </LegendColor>
              ))}
            </LegendItem>
          </LegendLabel>
        </LegendWrapper>
      </Widget>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default LastMonthProfile
