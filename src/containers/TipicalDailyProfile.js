import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import TipicalDailyProfileChart from '../components/TipicalDailyProfile/TipicalDailyProfileChart'
import Counter from '../components/Counter'
import LastUpdate from '../components/LastUpdate'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import { getDailyProfile } from '../services/api'

const Widget = styled.div`
    min-height: 220px;
    padding: 4px 4px 4px 24px;
    background-color: #f2f2f2;
    h3 {
      white-space: nowrap;
    }
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  margin: 16px 0;
  padding: 16px;
  &.text-right {
    justify-content: flex-end;
  }
  .vall {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin: 0 4px;
    background-color: #96b633;
  }
  .punta {
    width: 12px;
    height: 12px;
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
    <>
      <div className="row">
        <div className="col-xs-12">
          <CounterWrapper>
            <Counter
              title={t('DAILY_AVERAGE')}
              value={data?.dailyAvg?.value || '-'}
              date={t('LAST_12_MONTHS')} />
          </CounterWrapper>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            isLoading
              ? <Skeleton height={300} />
              : data?.dailyTypicalProfile
                ? <TipicalDailyProfileChart data={data?.dailyTypicalProfile} />
                : <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
          }
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Legend className="col-xs-12 col-md-6 text-right">
            <b>{t('WINTER')}:</b> <span className="vall"></span> {t('WINTER_VALLEY')} <span className="punta"></span> {t('WINTER_PEACK')}
          </Legend>
          <Legend className="col-xs-12 col-md-6">
            <b>{t('SUMMER')}:</b> <span className="vall"></span> {t('SUMMER_VALLEY')} <span className="punta"></span> {t('SUMMER_PEACK')}
          </Legend>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Widget>
            <DistributionByUserType contract={contract} />
          </Widget>
        </div>
        <div className="col-xs-12 col-md-6">
          <Widget>
            <DistributionByPeriod contract={contract} />
          </Widget>
        </div>
      </div>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalDailyProfile
