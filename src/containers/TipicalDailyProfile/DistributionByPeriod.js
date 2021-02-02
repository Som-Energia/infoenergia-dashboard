import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import { getDistributionByPeriod } from '../../services/api'

import { Container, Title, Wrapper, ChartWrapper, NoDataMessage } from './DistributionCharts'

const COLORS = {
  peakPercentage: '#f2970f',
  valleyPercentage: '#96b633',
  superValleyPercentage: '#616161'
}

const DistributionByPeriod = (props) => {
  const { contract } = props
  const { t } = useTranslation()
  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const VALUES = {
    peakPercentage: t('PICK'),
    valleyPercentage: t('VALLEY'),
    superValleyPercentage: t('SUPERVALLEY')
  }

  useEffect(() => {
    getDistributionByPeriod(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <Wrapper>
      {
        isLoading
          ? <Skeleton height={210} width="100%" />
          :
            !data
              ? <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
              : <>
                <Title>{t('DISTRIB_BY_PERIOD')}</Title>
                <Container>
                  <div className="max-w-50 ml-5">
                    <DistributionLegend colors={COLORS} values={VALUES} data={data} />
                  </div>
                  <ChartWrapper>
                    <DistributionPieChart colors={COLORS} data={data} />
                  </ChartWrapper>
                </Container>
                </>
      }
    </Wrapper>
  )
}

export default DistributionByPeriod
