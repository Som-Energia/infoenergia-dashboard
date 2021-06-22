import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Skeleton from '@material-ui/lab/Skeleton'

import SeasonalProfileBarChart from '../components/SeasonalProfile/SeasonalProfileBarChart'
import ClimaDependency from '../components/SeasonalProfile/ClimaDependency'
import LastUpdate from '../components/LastUpdate'

import { ScrollWrapper, ScrollContainer } from '../components/Utils'
import { Widget } from '../containers/TipicalDailyProfile/DistributionCharts'

import { getSeasonalProfile } from '../services/api'

function SeasonalProfile(props) {
  const { contract, token } = props
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [seasonFilter, setSeasonFilter] = useState('summer')

  const handleClick = (event, season) => {
    event.preventDefault()
    setSeasonFilter(season)
  }

  useEffect(() => {
    getSeasonalProfile(contract, token)
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
        <SelectorWrapper>
          <SelectorBox>
            <SelectorValue>{t('LAST_12_MONTHS')}</SelectorValue>
          </SelectorBox>
        </SelectorWrapper>
        <ChartWrapper>
          {isLoading ? (
            <Skeleton height={300} width="100%" />
          ) : data?.price ? (
            <ScrollContainer>
              <ScrollWrapper>
                <SeasonalProfileBarChart data={data} />
              </ScrollWrapper>
            </ScrollContainer>
          ) : data?.errors ? (
            <NoDataMessage>{t(data.errors)}</NoDataMessage>
          ) : (
            <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
          )}
        </ChartWrapper>
      </Widget>
      <Widget>
        <Wrapper>
          {isLoading ? (
            <Skeleton height={230} width="100%" />
          ) : (
            <>
              <TabWrapper>
                <Title>
                  {t('CLIMATE_DEPENDENCY')}
                  <span> {t('LAST_36_NONTH_BASE')}</span>
                </Title>
                <ButtonsWrapper>
                  {Object.keys(
                    data?.climaticDependence ? data?.climaticDependence : []
                  ).map((season) => (
                    <Button
                      key={season}
                      className={seasonFilter === season ? 'active' : null}
                      onClick={(event) => handleClick(event, season)}
                    >
                      {t(season.toUpperCase())}
                    </Button>
                  ))}
                </ButtonsWrapper>
              </TabWrapper>
              <ClimaDependency
                data={
                  data?.climaticDependence &&
                  data?.climaticDependence[seasonFilter]
                }
              />
            </>
          )}
        </Wrapper>
      </Widget>
      <LastUpdate date={data?.updated} />
    </>
  )
}

export default SeasonalProfile

const Wrapper = styled.div`
  color: #585857;
`

const SelectorWrapper = styled.div`
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
`

const ChartWrapper = styled.div`
  .unit {
    font-weight: 400;
    font-size: 1.35rem;
  }
`

const SelectorBox = styled.div`
  padding: 8px 8px;
  margin-bottom: 16px;
  color: #4d4d4d;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 260px;
`

const SelectorValue = styled.div`
  color: #96b633;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 4px;
  white-space: nowrap;
`

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.div`
  color: #96b633;
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

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-weight: 400;
  font-size: 1.25rem;
`
