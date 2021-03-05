import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const levels = [
  'null',
  'low',
  'moderate',
  'high'
]

const ClimaDependency = ({ data }) => {
  const { t } = useTranslation()
  console.log('data: ' + data)

  return (
    <div>
        {
          data === 'nothing'
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

    </div>
  )
}

export default ClimaDependency

const DependecyLevels = styled.div`
  display: flex;
  margin-top: 16px;
  background: rgb(150,182,51);
  background: linear-gradient(90deg, rgba(150,182,51,1) 0%, rgba(242,151,15,1) 80%, rgba(249,82,18,1) 100%);
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
  padding: 8px 8px;
  text-transform: uppercase;
  font-size: 1.35rem;
`

const NoDataMessage = styled.h3`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.15rem;
  font-weight: 300;
`