import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import { DatePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined'
import ClearIcon from '@material-ui/icons/Clear'

import Counter from '../components/Counter'
import TimeCurvesBarChart from '../components/TimeCurves/TimeCurvesBarChart'
import TimeCurvesLineChart from '../components/TimeCurves/TimeCurvesLineChart'

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CounterWrapper = styled.div`
  display: flex;
  padding-top: 16px;
  & > div {
    margin-left: 8px;
  }
`
const DateControlsWrapper = styled.div`
  padding-top: 0;
`

const ChartWrapper = styled.div`
  padding-bottom: 24px;
`

const periodUnit = (period) => {
  switch (period) {
    case 'DAILY':
      return 'd'
    case 'WEEKLY':
      return 'w'
    case 'MONTHLY':
      return 'M'
    case 'YEARLY':
      return 'y'
    default:
      return ''
  }
}

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
  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [compareDate, setCompareDate] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [compareData, setCompareData] = useState([])
  const [totalKwh, setTotalKwh] = useState('-')
  const [compareTotalKwh, setCompareTotalKwh] = useState()

  useEffect(() => {
    const firstItem = data[0]
    const firstDate = moment(firstItem?.date)
    firstDate.set('hour', 0)
    setMinDate(firstDate)

    const lastItem = [...data].pop()
    const lastDate = moment(lastItem?.date)
    lastDate.set('hour', 0)
    setMaxDate(lastDate)

    setCurrentDate(lastDate)
  }, [data])

  useEffect(() => {
    const filtered = filterDataWithPeriod(currentDate, period, data, chartType)
    setFilteredData(filtered)

    const sumTotalKwh = (totalValueWithData(filtered) / 1000).toFixed(0)
    setTotalKwh(sumTotalKwh)

    if (compareDate) {
      const filteredCompare = filterDataWithPeriod(compareDate, period, data, chartType)
      setCompareData(filteredCompare)

      const sumCompTotalKwh = (totalValueWithData(filteredCompare) / 1000).toFixed(0)
      setCompareTotalKwh(sumCompTotalKwh)
    }
  }, [data, currentDate, period, chartType, compareDate])

  const prevDate = useCallback((event) => {
    event.preventDefault()
    const prevDate = moment(currentDate).subtract(1, periodUnit(period))
    setCurrentDate(prevDate)
  }, [currentDate, period])

  const nextDate = useCallback((event) => {
    event.preventDefault()
    const nextDate = moment(currentDate).add(1, periodUnit(period))
    setCurrentDate(nextDate)
  }, [currentDate, period])

  return (
    <>
      <ControlsWrapper>
        <DateControlsWrapper>
          <IconButton
            onClick={prevDate}
            disabled={moment(currentDate).isSame(minDate, 'day')}
          >
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <DatePicker
            value={currentDate}
            minDate={minDate}
            maxDate={maxDate}
            variant="inline"
            autoOk
            size="small"
            inputVariant="outlined"
            onChange={setCurrentDate}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
            }}
          />
          <IconButton
            onClick={nextDate}
            disabled={moment(currentDate).isSame(maxDate, 'day')}
          >
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
          <DatePicker
            value={compareDate}
            minDate={minDate}
            maxDate={maxDate}
            variant="inline"
            placeholder="Comparar"
            autoOk
            size="small"
            inputVariant="outlined"
            onChange={setCompareDate}
            shouldDisableDate={(date) => moment(date).isSame(currentDate, 'day')}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
            }}
          />
          {
            compareDate &&
              <IconButton onClick={() => setCompareDate(null)}>
                <ClearIcon />
              </IconButton>
          }
        </DateControlsWrapper>
        <CounterWrapper>
          <Counter
            value={totalKwh}
            title="Total diària"
            date={moment(currentDate).format('DD/MM/YYYY')}
          />
          { compareDate &&
            <Counter
              value={compareTotalKwh}
              title="Total diària"
              date={moment(compareDate).format('DD/MM/YYYY')}
              color="secondary"
            />
          }
        </CounterWrapper>
      </ControlsWrapper>
      <div className="row">
        <div className="col-xs-12">
          <ChartWrapper>
            { chartType === 'LINE_CHART_TYPE'
              ? <TimeCurvesLineChart
                data={filteredData}
                compareData={compareData}
                period={period}
              />
              : <TimeCurvesBarChart
                data={filteredData}
                compareData={compareData}
                period={period}
              />
            }
          </ChartWrapper>
        </div>
      </div>
    </>
  )
}

export default React.memo(TimeCurves)
