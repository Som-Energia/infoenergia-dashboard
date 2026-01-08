import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import Skeleton from '@mui/material/Skeleton'

import { getDistributionByTypeOfUse } from '../../services/api'

import {
  Container,
  Title,
  Wrapper,
  ChartWrapper,
  NoDataMessage,
  LegendWrapper,
} from './DistributionCharts'

export default function DistributionByUserType(props) {
  const { contract, token } = props
  const { t } = useTranslation()
  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = {
    permanent: '#f2970f',
    peak: '#616161',
    regular: '#96b633',
  }

  const VALUES = {
    permanent: t('PERMANENT'),
    peak: t('PIC'),
    regular: t('REGULAR'),
  }

  useEffect(() => {
    getDistributionByTypeOfUse(contract, token)
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
    <Wrapper>
      {isLoading ? (
        <Skeleton height={210} width="100%" />
      ) : !data || data?.error ? (
        <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
      ) : (
        <>
          <Title>{t('DISTRIB_BY_USE_TYPE')}</Title>
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
