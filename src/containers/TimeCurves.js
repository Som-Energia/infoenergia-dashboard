import React, { useState } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'

import ArrowBack from '@material-ui/icons/ArrowBackOutlined'
import ArrowForward from '@material-ui/icons/ArrowForwardOutlined'

import TimeCurvesBarChart from '../components/TimeCurves/TimeCurvesBarChart'
import TimeCurvesLineChart from '../components/TimeCurves/TimeCurvesLineChart'
import Counter from '../components/Counter'

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CounterWrapper = styled.div`
  padding-top: 16px;
`
const DateControlsWrapper = styled.div`
  padding-top: 0;
`

const ChartWrapper = styled.div`
  padding-bottom: 24px;
`

const filterDataWithPeriod = (refDate, period, data, chartType) => {
  switch (period) {
    case 'DAILY':
      return data.filter(item => moment(item?.date).isSame(refDate, 'day'))
    case 'WEEKLY':
      return data.filter(item => moment(item?.date).isSame(refDate, 'week'))
    case 'MONTHLY':
      return data.filter(item => moment(item?.date).isSame(refDate, 'month'))
    case 'YEARLY':
      return data.filter(item => moment(item?.date).isSame(refDate, 'year'))
    default:
      return []
  }
}

function TimeCurves ({ data, chartType, period }) {
  const refDate = ''
  const [selectedDate, handleDateChange] = useState(new Date())
  const totalKwh = 2

  const filteredData = filterDataWithPeriod(selectedDate, period, data, chartType)

  return (
    <React.Fragment>
      <ControlsWrapper>
        <DateControlsWrapper>
          <DatePicker
            value={selectedDate}
            variant="inline"
            autoOk
            inputVariant="outlined"
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: <IconButton onClick={(event) => event.preventDefault()}><ArrowBack /></IconButton>,
              endAdornment: <IconButton onClick={(event) => event.preventDefault()}><ArrowForward /></IconButton>
            }}
          />
        </DateControlsWrapper>
        <CounterWrapper>
          <Counter title="Total diària" value={totalKwh} date={moment(selectedDate).format('DD/MM/YYYY')} />
        </CounterWrapper>
      </ControlsWrapper>
      <div className="row">
        <div className="col-xs-12">
          <ChartWrapper>
            { chartType === 'LINE_CHART_TYPE'
              ? <TimeCurvesLineChart data={filteredData} />
              : <TimeCurvesBarChart data={filteredData} />
            }
          </ChartWrapper>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimeCurves
