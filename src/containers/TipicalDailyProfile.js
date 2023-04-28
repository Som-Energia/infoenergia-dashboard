import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import TipicalDailyProfileChart from 'components/TipicalDailyProfile/TipicalDailyProfileChart'
import Counter from 'components/Counter'
import LastUpdate from 'components/LastUpdate'

import DistributionByPeriod from 'containers/TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from 'containers/TipicalDailyProfile/DistributionByUserType'

import { ScrollWrapper, ScrollContainer } from 'components/Utils'
import { Widget } from 'containers/TipicalDailyProfile/DistributionCharts'

import { getDailyProfile } from 'services/api'

import ErrorOutlineIcon from '@material-ui/icons/Error'


const useStyles = makeStyles((theme) => ({
    message: {
        marginTop: theme.spacing(4),
        fontSize: '1rem',
        textAlign: 'center',
        color: theme?.typography?.color,
      },
  }))


function TipicalDailyProfile(props) {
  const { contract, token, tariff } = props
  const { t } = useTranslation()
  const classes = useStyles()

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
      {tariff !== '2.0TD' ? (
        <Typography className={classes.message}>
          {t('ONLY_FOR_20TD')}
        </Typography>
      ) : (
        <>
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
        </>
      )}
      </Widget>
      <Separator />

      <WidgetGrid>
        <Widget>
          <DistributionByUserType {...props} />
        </Widget>
        <Widget>
        {tariff !== '2.0TD' ? (
          <Typography className={classes.message}>
            {t('ONLY_FOR_20TD')}
          </Typography>
        ) : (
        <>
          <DistributionByPeriod {...props} />
        </>
      )}
        </Widget>
      </WidgetGrid>

      <LastUpdate date={data?.updated} />
    </>
  )
}

export default TipicalDailyProfile

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
  margin-top: 24px;
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
