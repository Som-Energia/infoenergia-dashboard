import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getLegendFromTimeTable } from '../../services/timecurves'
import LegendTable from './LegendTable'

const LegendPeriod = ({ contract }) => {

  const [legend, setLegend] = useState(null)

  useEffect(() => {
    setLegend(getLegendFromTimeTable(contract.timetable))
  }, [contract])
  
  return (
    <LegendWrapper>
      {legend ? (
        <LegendTable
          header={legend.intervals}
          data={legend.groupingPeriodMonth}
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
