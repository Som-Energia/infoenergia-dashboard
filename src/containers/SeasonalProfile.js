import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import SeasonalProfileBarChart from '../components/SeasonalProfile/SeasonalProfileBarChart'
import ClimaDependency from '../components/SeasonalProfile/ClimaDependency'
import LastUpdate from '../components/LastUpdate'

import { getSeasonalProfile } from '../services/api'

const Wrapper = styled.div`
  background-color: #f2f2f2;
  color: #585857;
  margin-top: 24px;
  padding: 16px 24px 24px;
`

const SelectorWrapper = styled.div`
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
`

const SelectorBox = styled.div`
    padding: 8px 8px;
    margin-bottom: 20px;
    background-color: #96b633;
    color: #fff;
    display: flex;
    align-items: center;
    min-width: 260px;
`

const SelectorValue = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0 4px;
    white-space: nowrap;
`

const TabWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  span {
    font-size: 16px;
    font-weight: 400;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  & > button {
    margin-top: 8px;
  }
`

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  color: #fff;
  font-weight: 500;
  background: #585857;
  border: 0;
  white-space: nowrap;
  min-width: 75px;
  text-transform: capitalize;
  &.active {
    background: #96b633;
  }
`

const AdviceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
`

const AdviceText = styled.div`
  margin-top: 8px;
`

const AdviceButton = styled(Button)`
  color: #fff;
  font-weight: 500;
  background: #96b633;
  margin-top: 8px;
`

function SeasonalProfile (props) {
  const { contract } = props
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [seasonFilter, setSeasonFilter] = useState('summer')

  const handleClick = (event, season) => {
    event.preventDefault()
    setSeasonFilter(season)
  }

  useEffect(() => {
    getSeasonalProfile(contract)
      .then(response => {
        console.log(response)
        setData(response)
        setIsLoading(false)
      })
  }, [contract])

  return (
    <>
      <SelectorWrapper>
        <SelectorBox>
          <SelectorValue>Últims 12 mesos</SelectorValue>
        </SelectorBox>
      </SelectorWrapper>
      {
        isLoading
          ? 'Loading...'
          : <SeasonalProfileBarChart data={data} />
      }
      <Wrapper>
        {
          isLoading
            ? 'Loading...'
            : <>
              <TabWrapper>
                <Title>Dependència climàtica<span> en base als últims 36 mesos</span></Title>
                <ButtonsWrapper>
                  {
                    Object.keys(data?.climaticDependence)
                      .map(season => (
                        <Button
                          key={season}
                          className={ seasonFilter === season ? 'active' : null }
                          onClick={event => handleClick(event, season)}>
                          {season}
                        </Button>
                      ))
                  }
                </ButtonsWrapper>
              </TabWrapper>
              <ClimaDependency data={data?.climaticDependence[seasonFilter]} />
              <AdviceWrapper>
                <AdviceText>
                  Quan augmenta la temperatura exterior el teu ús d'energia augmenta en igual mida.
                </AdviceText>
                <AdviceButton>
                  INFORMA'T
                </AdviceButton>
              </AdviceWrapper>
            </>
        }
      </Wrapper>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default SeasonalProfile
