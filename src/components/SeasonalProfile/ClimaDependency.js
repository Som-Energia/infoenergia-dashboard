import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
`

const DependecyLevels = styled.div`
  display: flex;
  margin-top: 16px;
  background: rgb(150,182,51);
  background: linear-gradient(90deg, rgba(150,182,51,1) 0%, rgba(242,151,15,1) 75%, rgba(97,97,97,1) 100%);
`

const DependecyLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  background-color: transparent;

  .edge {
    background-color: #f2f2f2;
    padding-top: 16px;
    width: 100%;
    flex: 1;
  }
  &.active .edge {
    background-color: transparent;
  }

  &.active ~ & {
    background-color: #585857;
  }
`

const Level = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
`

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25rem;
  font-weight: 300;
`

const levels = [
  'null',
  'low',
  'moderate',
  'hight'
]

const ClimaDependency = ({ data }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
        {
          data === 'nodata'
            ? <NoDataMessage>{t('NO_DATA')}</NoDataMessage>
            : <DependecyLevels>
              { levels.map(level => (
              <DependecyLevel key={level} className={ level === data ? 'active' : null }>
                <div className="edge" />
                <Level>{t(level.toUpperCase())}</Level>
                <div className="edge" />
              </DependecyLevel>
            ))
              }
              </DependecyLevels>
        }

    </Wrapper>
  )
}

export default ClimaDependency
