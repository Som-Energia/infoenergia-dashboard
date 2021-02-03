import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'

import TipicalDailyProfileChart from '../components/TipicalDailyProfile/TipicalDailyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import { getDailyProfile } from '../services/api'

const Widget = styled.div`
    min-height: 220px;
    padding: 0 16px;
    background-color: #f2f2f2;
    h3 {
      white-space: nowrap;
    }
    display: flex;
    flex-direction: column;
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  margin-bottom: 16px;
  padding: 16px 12px;
  justify-content: flex-start;
  &:first-child {
    margin-bottom: 0;
    @media (min-width: 768px) {
      padding-bottom: 16px;
    }
  }
  &.text-right {
    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }
  .vall {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #96b633;
  }
  .punta {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #f2970f;
  }
`
const CounterWrapper = styled.div`
  padding-top: 4px;
`

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-weight: 400;
`

const Separator = styled.div`
  display: block;
  margin-top: 16px;
  width: 100%;
`

function TipicalDailyProfile (props) {
  const { contract, token } = props
  const { t } = useTranslation()

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDailyProfile(contract, token)
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [contract, token])

  return (
    <Grid container>
      <Grid item xs={12}>
        <CounterWrapper>
          <Counter
            title={t('DAILY_AVERAGE')}
            value={data?.dailyAvg?.value || '-'}
            date={t('LAST_12_MONTHS')} />
        </CounterWrapper>
      </Grid>
      <Grid item xs={12}>
        {
          isLoading
            ? <Skeleton height={300} />
            : data?.dailyTypicalProfile
              ? <TipicalDailyProfileChart data={data?.dailyTypicalProfile} />
              : data?.errors ? <NoDataMessage>{t(data.errors)}</NoDataMessage> : <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
        }
      </Grid>

      <Separator />

      <Grid container>
        <Grid item sm={6} xs={12}>
          <Legend className="text-right">
            <b>{t('WINTER')}</b>
            <span className="vall"></span> {t('WINTER_VALLEY')}
            <span className="punta"></span> {t('WINTER_PEACK')}
          </Legend>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Legend>
            <b>{t('SUMMER')}</b>
            <span className="vall"></span> {t('SUMMER_VALLEY')}
            <span className="punta"></span> {t('SUMMER_PEACK')}
          </Legend>
        </Grid>
      </Grid>

      <Separator />

      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Widget>
            <DistributionByUserType {...props} />
          </Widget>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Widget>
            <DistributionByPeriod {...props} />
          </Widget>
        </Grid>
      </Grid>

      <LastUpdate date={data?.updated} />

    </Grid>
  )
}

export default TipicalDailyProfile
