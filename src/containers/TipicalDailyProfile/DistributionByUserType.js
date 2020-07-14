import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import Skeleton from '@material-ui/lab/Skeleton'

import { getDistributionByTypeOfUse } from '../../services/api'

const COLORS = {
  permanent: '#f2970f',
  peak: '#616161',
  regular: '#96b633'
}

const VALUES = {
  permanent: 'Permanent',
  peak: 'PIC',
  regular: 'Regular'
}

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
`
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-beetween;
  flex-wrap: nowrap;
`

const ChartWrapper = styled.div`
  width: 100%;
  align-self: center;
`

export default function DistributionByUserType (props) {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDistributionByTypeOfUse(contract)
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      {
        isLoading
          ? <Skeleton>
            <Wrapper>
              <div>
                <Title/>
              </div>
              <ChartWrapper>
              </ChartWrapper>
            </Wrapper>
          </Skeleton>
          : <Wrapper>
            <div>
              <Title>Distribució<br />per tipus d'ús</Title>
              <DistributionLegend colors={COLORS} values={VALUES} data={data} />
            </div>
            <ChartWrapper>
              <DistributionPieChart colors={COLORS} data={data} />
            </ChartWrapper>
          </Wrapper>
      }
    </>
  )
}
