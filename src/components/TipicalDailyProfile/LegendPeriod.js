import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { ScrollContainer } from '../Utils'

const LegendPeriod = () => {
  const { t } = useTranslation()
  return (
    <LegendWrapper>
      <Legend>
        <b>{t('WORKING_DAYS')}</b>
        <span className="item">
          <span className="vall"></span> {t('WORKING_VALLEY')}
        </span>
        <span className="item">
          <span className="pla"></span> {t('WORKING_FLAT_1')}
        </span>
        <span className="item">
          <span className="punta"></span> {t('WORKING_PEAK_1')}
        </span>
        <span className="item">
          <span className="pla"></span> {t('WORKING_FLAT_2')}
        </span>
        <span className="item">
          <span className="punta"></span> {t('WORKING_PEAK_2')}
        </span>
        <span className="item">
          <span className="pla"></span> {t('WORKING_FLAT_3')}
        </span>
      </Legend>
      <Legend>
        <b>{t('WEEKEND_DAYS')}</b>
        <span className="vall"></span> {t('WEEKEND_VALLEY')}
      </Legend>
    </LegendWrapper>
  )
}

export default LegendPeriod

const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Legend = styled(ScrollContainer)`
  display: flex;
  align-items: center;
  padding: 16px 12px;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
  flex-grow: 1;
  flex-wrap: wrap;
  &:last-child {
    padding-top: 0;
  }
  .item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    @media (max-width: 768px) {
      min-width: 140px;
    }
  }
  .vall {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #c4dd8c;
  }
  .punta {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #f2970f;
  }
  .pla {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 0 8px;
    background-color: #96b633;
  }
`
