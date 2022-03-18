import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import TipicalWeeklyProfileChart from 'components/TipicalWeeklyProfile/TipicalWeeklyProfileChart'
import Counter from 'components/Counter'
import LastUpdate from 'components/LastUpdate'

import { ScrollWrapper, ScrollContainer } from 'components/Utils'
import { Widget } from 'containers/TipicalDailyProfile/DistributionCharts'

import { getWeeklyProfile } from 'services/api'

const TipicalWeeklyProfile = (props) => {
  const { contract, token } = props
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWeeklyProfile(contract, token)
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
      <Widget>
        <CounterWrapper>
          <Counter
            title={t('WEEKLY_AVERAGE')}
            value={data?.value || '-'}
            date={t('LAST_12_MONTHS')}
          />
        </CounterWrapper>
        <ScrollContainer>
          <ScrollWrapper>
            <ChartWrapper>
              {isLoading ? (
                <Skeleton height={300} width="100%" />
              ) : data?.avgWeekCCH ? (
                <TipicalWeeklyProfileChart
                  data={{
                    avgWeekCCH: data?.avgWeekCCH,
                    formatAvgWeekCCH: data?.formatAvgWeekCCH,
                  }}
                />
              ) : data?.errors ? (
                <NoDataMessage>{t(data.errors)}</NoDataMessage>
              ) : (
                <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
              )}
            </ChartWrapper>
          </ScrollWrapper>
        </ScrollContainer>
        <WeeklyMediumWrapper>
          <DailyMediumWrapper>
            <MediumValue>
              {data?.weekValue || '-'} <span>kWh</span>
            </MediumValue>
            <span
              className="text"
              dangerouslySetInnerHTML={{
                __html: t('AVG_USE_BETWEEN_WEEKDAY'),
              }}
            ></span>
          </DailyMediumWrapper>
          <WeekendMediumWrapper>
            <MediumValue>
              {data?.weekendValue || '-'} <span>kWh</span>
            </MediumValue>
            <span
              className="text"
              dangerouslySetInnerHTML={{
                __html: t('AVG_USE_WEEKEND_DAY'),
              }}
            ></span>
          </WeekendMediumWrapper>
        </WeeklyMediumWrapper>
      </Widget>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalWeeklyProfile

const CounterWrapper = styled.div``

const WeeklyMediumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const MediumWrapper = styled.div`
  padding: 8px 8px;
  display: flex;
  align-items: center;
  color: #585857;
  span {
    line-height: 1.2rem;
  }
  .text {
    color: #4d4d4d;
  }
`

const DailyMediumWrapper = styled(MediumWrapper)`
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
  }
  color: #96b633;
  border: 2px solid #96b633;
  padding-right: 8px;
  border-radius: 10px;
  margin-bottom: 4px;
`

const WeekendMediumWrapper = styled(MediumWrapper)`
  width: 100%;
  @media (min-width: 768px) {
    width: 29%;
    margin-left: 12px;
  }
  padding-right: 8px;
  color: #96b633;
  border: 2px solid #96b633;
  padding-right: 8px;
  border-radius: 10px;
  margin-bottom: 4px;
`

const MediumValue = styled.div`
  padding: 0 8px;
  font-size: 2.2rem;
  font-weight: bold;
  white-space: nowrap;
  padding-right: 12px;
  span:last-child {
    font-weight: 400;
    font-size: 1.8rem;
  }
`

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-weight: 400;
`

const ChartWrapper = styled.div`
  width: 100%;
  .units {
    font-weight: 400;
    font-size: 1.25rem;
  }
`
