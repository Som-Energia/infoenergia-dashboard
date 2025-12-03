import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import { getDistributionByPeriod } from '../../services/api'

import {
  Container,
  Title,
  Wrapper,
  ChartWrapper,
  NoDataMessage,
  LegendWrapper,
} from './DistributionCharts'

const COLORS = {
  peakPercentage: '#f2970f',
  valleyPercentage: '#96b633',
  superValleyPercentage: '#c4dd8c',
}

const DistributionByPeriod = (props) => {
  const { contract, token } = props
  const { t } = useTranslation()
  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const VALUES = {
    peakPercentage: t('PICK'),
    valleyPercentage: t('FLAT'),
    superValleyPercentage: t('VALLEY'),
  }

  useEffect(() => {
    getDistributionByPeriod(contract, token)
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [contract, token])

  return (
    <Wrapper>
      {isLoading ? (
        <Skeleton height={210} width="100%" />
      ) : !data || data?.error ? (
        <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
      ) : (
        <>
          <Title>{t('DISTRIB_BY_PERIOD')}</Title>
          <Container>
            <ChartWrapper>
              <DistributionPieChart colors={COLORS} data={data} />
            </ChartWrapper>
            <LegendWrapper>
              <DistributionLegend colors={COLORS} values={VALUES} data={data} />
            </LegendWrapper>
          </Container>
        </>
      )}
    </Wrapper>
  )
}

export default DistributionByPeriod
