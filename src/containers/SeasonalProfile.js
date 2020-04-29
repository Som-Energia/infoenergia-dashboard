import React, { useState } from 'react'
import styled from 'styled-components'

import SeasonalProfileBarChart from '../components/SeasonalProfile/SeasonalProfileBarChart'
import ClimaDependency from '../components/SeasonalProfile/ClimaDependency'
import LastUpdate from '../components/LastUpdate'

import mockData from '../services/SeasonalProfile'

const Wrapper = styled.div`
  margin-top: 24px;
  background-color: #f2f2f2;
  color: #585857;
  padding: 16px;
`

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  span {
    font-size: 14px;
    font-weight: 400;
  }
`

const ButtonsWrapper = styled.div`
  margin-left: 8px;
`

const Button = styled.button`
  padding: 10px 16px;
  color: #fff;
  font-weight: bold;
  background: #585857;
  border: 0;
  white-space:nowrap;
  margin-left: 8px;
`

function SeasonalProfile () {
  return (
    <>
      <SeasonalProfileBarChart data={mockData?.perfilEstacional} />
      <Wrapper>
        <TopWrapper>
          <Title>Dependència climàtica<span> en base als últims 36 mesos</span></Title>
          <ButtonsWrapper>
            <Button>Hivern</Button>
            <Button>Estiu</Button>
          </ButtonsWrapper>
        </TopWrapper>
        <ClimaDependency />
      </Wrapper>
      <LastUpdate />
    </>
  )
}

export default SeasonalProfile
