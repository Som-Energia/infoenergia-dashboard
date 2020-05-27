import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'

import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'

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

const filterDataWithPeriod = (refDate, period, data, charType) => {
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

const totalValueWithData = (data) => {
  return data.reduce((prev, current) => prev + current?.value, 0)
}

function TimeCurves ({ data, chartType, period }) {
  const [selectedDate, setSelectedDate] = useState()
  const [selectedCompDate, setSelectedCompDate] = useState(null)
  const [filteredData, setFilteredData] = useState()
  const [totalKwh, setTotalKwh] = useState('-')

  useEffect(() => {
    const last = data.pop()
    const lastDate = moment(last?.date)
    setSelectedDate(lastDate)
  }, [data, period])

  useEffect(() => {
    const filtered = filterDataWithPeriod(selectedDate, period, data, chartType)
    setFilteredData(filtered)
    const sumTotalKwh = totalValueWithData(filtered) / 1000
    setTotalKwh(sumTotalKwh)
  }, [data, selectedDate, period, chartType])

  return (
    <React.Fragment>
      <ControlsWrapper>
        <DateControlsWrapper>
          <IconButton>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <DatePicker
            value={selectedDate}
            variant="inline"
            autoOk
            size="small"
            inputVariant="outlined"
            onChange={setSelectedDate}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
            }}
          />
          <IconButton>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>

          <DatePicker
            value={selectedCompDate}
            variant="inline"
            placeholder="Comparar"
            autoOk
            size="small"
            inputVariant="outlined"
            onChange={setSelectedCompDate}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
            }}
          />
        </DateControlsWrapper>
        <CounterWrapper>
          <Counter
            title="Total diària"
            value={totalKwh}
            date={moment(selectedDate).format('DD/MM/YYYY')}
          />
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
