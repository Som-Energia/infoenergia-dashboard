import React, { useState } from 'react'
import styled from 'styled-components'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import mockedData from '../../services/DistributionByPeriodMock'

const COLORS = {
  perc_punta: '#616161',
  perc_vall: '#96b633'
}

const VALUES = {
  perc_punta: 'Punta',
  perc_vall: 'Vall'
}

const Title = styled.h3`
  font-size: 2.25rem;
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

export default function DistributionByPeriod () {
  const [data, setData] = useState(mockedData)

  return (
    <Wrapper>
      <div>
        <Title>Distribució<br />per períodes</Title>
        <DistributionLegend colors={COLORS} values={VALUES} data={data?.distribucio_periodes} />
      </div>
      <ChartWrapper>
        <DistributionPieChart colors={COLORS} data={data?.distribucio_periodes} />
      </ChartWrapper>
    </Wrapper>
  )
}
