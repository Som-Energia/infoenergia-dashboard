import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import { getDistributionByPeriod } from '../../services/api'

const COLORS = {
  peakPercentage: '#616161',
  valleyPercentage: '#96b633'
}

const VALUES = {
  peakPercentage: 'Punta',
  valleyPercentage: 'Vall'
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

const DistributionByPeriod = (props) => {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDistributionByPeriod(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <Wrapper>
      {
        isLoading
          ? 'Loading ...'
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
