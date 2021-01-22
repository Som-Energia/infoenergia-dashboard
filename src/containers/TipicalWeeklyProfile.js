import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import TipicalWeeklyProfileChart from '../components/TipicalWeeklyProfile/TipicalWeeklyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import { getWeeklyProfile } from '../services/api'

const CounterWrapper = styled.div`
  padding-top: 4px;
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
  margin-bottom: 8px;
  flex-wrap: wrap;
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
  padding: 4px 12px;
  font-weight: 500;
`

const DayTypeWrapperWeekend = styled(MediumWrapper)`
  width: 29%;
  padding: 4px 12px;
  font-weight: 500;
`

const DailyMediumWrapper = styled(MediumWrapper)`
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
  }
  background-color: #96b633;
  color: #ffffff;
  padding-right: 8px;
`

const WeekendMediumWrapper = styled(MediumWrapper)`
  width: 100%;
  @media (min-width: 768px) {
    width: 29%;
  }
  padding-right: 8px;
`

const MediumValue = styled.div`
  padding: 0 8px;
  font-size: 2.2rem;
  font-weight: bold;
  white-space: nowrap;
  padding-right: 12px;
`

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`

const ChartWrapper = styled.div`
  width: 100%;
`

const TipicalWeeklyProfile = (props) => {
  const { contract } = props
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWeeklyProfile(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      <CounterWrapper>
        <Counter
          title={t('WEEKLY_AVERAGE')}
          value={data?.value || '-'}
          date={t('LAST_12_MONTHS')}
        />
      </CounterWrapper>
      <DayTypeWrapper>
        <DayTypeWrapperDaily>
          { t('BETWEEN_WEEKDAYS') }
        </DayTypeWrapperDaily>
        <DayTypeWrapperWeekend>
          { t('WEEKEND') }
        </DayTypeWrapperWeekend>
      </DayTypeWrapper>
      <ChartWrapper>
      {
        isLoading
          ? <Skeleton height={300}  width="100%" />
          : data?.avgWeekCCH
            ? <TipicalWeeklyProfileChart data={{ avgWeekCCH: data?.avgWeekCCH, formatAvgWeekCCH: data?.formatAvgWeekCCH }} />
            : data?.errors ? <NoDataMessage>{t(data.errors)}</NoDataMessage> : <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
      }
      </ChartWrapper>
      <WeeklyMediumWrapper>
        <DailyMediumWrapper>
          <MediumValue>{data?.weekValue || '-'} kWh</MediumValue>
          <span>{ t('AVG_USE_BETWEEN_WEEKDAY') }</span>
        </DailyMediumWrapper>
        <WeekendMediumWrapper>
          <MediumValue>{data?.weekendValue || '-'} kWh</MediumValue>
          <span>{ t('AVG_USE_WEEKEND_DAY') }</span>
        </WeekendMediumWrapper>
      </WeeklyMediumWrapper>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalWeeklyProfile
