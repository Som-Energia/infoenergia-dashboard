import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { getLegendFromTimeTable } from '../../services/timecurves'
import LegendTable from './LegendTable'

import { ScrollContainer } from '../Utils'

const LegendPeriod = ({ contract }) => {

  const [legend, setLegend] = useState(null)

  useEffect(() => {
    setLegend(getLegendFromTimeTable(contract.timetable))
  }, [contract])
  const { t } = useTranslation()
  
  return (
    <LegendWrapper>
      <Legend>
        <b>{t('WORKING_DAYS')}</b>
      </Legend>
      {legend ? (
        <LegendTable
          header={legend.intervals}
          data={legend.groupingPeriodMonth}
        />
      ) : null}
      <Legend>
        <b>{t('WEEKEND_DAYS')}</b>
      </Legend>
      {legend ? (
        <LegendTable
          header={legend.intervals}
          data={legend.weekendAndHolidays}
        />
      ) : null}
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
`
