import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import { getDistributionByPeriod } from '../../services/api'

const COLORS = {
  peakPercentage: '#f2970f',
  valleyPercentage: '#96b633',
  superValleyPercentage: '#616161'
}

const VALUES = {
  peakPercentage: 'Punta',
  valleyPercentage: 'Vall',
  superValleyPercentage: 'Supervall'
}

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
`

const ChartWrapper = styled.div`
  width: 100%;
  align-self: center;
`

const NoDataMessage = styled.h3`
  flex: 1;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DistributionByPeriod = (props) => {
  const { contract } = props
  const { t } = useTranslation()
  const [data, setData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDistributionByPeriod(contract)
      .then(response => {
        console.log(response)
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
                  <div>
                    <Title>Distribució<br />per períodes</Title>
                    <DistributionLegend colors={COLORS} values={VALUES} data={data} />
                  </div>
                  <ChartWrapper>
                    <DistributionPieChart colors={COLORS} data={data} />
                  </ChartWrapper>
              </>
      }
    </Wrapper>
  )
}

export default DistributionByPeriod
