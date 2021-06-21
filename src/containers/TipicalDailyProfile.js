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

import { ScrollWrapper, ScrollContainer } from '../components/Utils'
import { Widget } from '../containers/TipicalDailyProfile/DistributionCharts'

import { getDailyProfile } from '../services/api'

import ErrorOutlineIcon from '@material-ui/icons/Error'

function TipicalDailyProfile(props) {
  const { contract, token } = props
  const { t } = useTranslation()

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDailyProfile(contract, token)
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
        <Grid item xs={12}>
          <CounterWrapper>
            <Counter
              title={t('DAILY_AVERAGE')}
              value={data?.dailyAvg?.value || '-'}
              date={t('LAST_12_MONTHS')}
            />
          </CounterWrapper>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton height={300} />
          ) : data?.dailyTypicalProfile ? (
            <ScrollContainer>
              <ScrollWrapper>
                <TipicalDailyProfileChart data={data?.dailyTypicalProfile} />
              </ScrollWrapper>
            </ScrollContainer>
          ) : data?.errors ? (
            // <NoDataMessage>{t(data.errors)}</NoDataMessage>
            <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
          ) : (
            <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
          )}
        </Grid>

        <Separator />

        <Grid container>
          <Grid item xs={12}>
            <LegendWrapper>
              <Legend>
                <b>{t('WORKING_DAYS')}</b>
                <span className="item">
                  <span className="vall"></span> {t('WORKING_VALLEY')}
                </span>
                <span className="item">
                  <span className="pla"></span> {t('WORKING_FLAT_1')}
                </span>
                <span className="item">
                  <span className="punta"></span> {t('WORKING_PEAK_1')}
                </span>
                <span className="item">
                  <span className="pla"></span> {t('WORKING_FLAT_2')}
                </span>
                <span className="item">
                  <span className="punta"></span> {t('WORKING_PEAK_2')}
                </span>
                <span className="item">
                  <span className="pla"></span> {t('WORKING_FLAT_3')}
                </span>
              </Legend>
              <Legend>
                <b>{t('WEEKEND_DAYS')}</b>
                <span className="vall"></span> {t('WEEKEND_VALLEY')}
              </Legend>
            </LegendWrapper>
          </Grid>
          <Grid item xs={12}>
            <Message>
              <div className="iconWrapper">
                <ErrorOutlineIcon fontSize="large" />
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('CONSUME_ADVICE'),
                }}
              ></p>
            </Message>
          </Grid>
        </Grid>
      </Widget>
      <Separator />

      <WidgetGrid>
        <Widget>
          <DistributionByUserType {...props} />
        </Widget>
        <Widget>
          <DistributionByPeriod {...props} />
        </Widget>
      </WidgetGrid>

      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalDailyProfile

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Legend = styled(ScrollContainer)`
  display: flex;
  align-items: center;
  padding: 16px 12px;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
  flex-grow: 1;
  &:last-child {
    padding-top: 0;
  }
  .item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    @media (max-width: 768px) {
      min-width: 140px;
    }
  }
  .vall {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #c4dd8c;
  }
  .punta {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #f2970f;
  }
  .pla {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #96b633;
  }
`
const CounterWrapper = styled.div``

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-weight: 400;
`

const Separator = styled.div`
  display: block;
  margin-top: 32px;
  width: 100%;
`

const Message = styled.div`
  border: 2px solid #96b633;
  border-radius: 8px;
  background-color: #fff;
  padding: 16px 24px;
  margin-top: 16px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  .iconWrapper {
    color: #96b633;
  }
  & > div {
    padding-right: 24px;
  }
  p {
    line-height: 1.6rem;
    margin: 0;
  }
  a {
    text-decoration: underline;
    color: #4d4d4d;
  }
`

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`
