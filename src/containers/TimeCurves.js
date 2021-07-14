import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import * as dayjs from 'dayjs'
import { DatePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined'
import ClearIcon from '@material-ui/icons/Clear'

import Counter from '../components/Counter'
import TimeCurvesBarChart from '../components/TimeCurves/TimeCurvesBarChart'
import TimeCurvesLineChart from '../components/TimeCurves/TimeCurvesLineChart'
import { Widget } from '../containers/TipicalDailyProfile/DistributionCharts'

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CounterWrapper = styled.div`
  display: flex;
  & > div {
    margin-left: 8px;
  }
`
const DateControlsWrapper = styled.div`
  padding-top: 0;
  display: flex;
  align-items: center;
`

const ChartWrapper = styled.div`
  padding-top: 16px;
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
      return data.filter(
        (item) =>
          dayjs(item?.date).isSame(refDate, 'day') ||
          (dayjs(item?.date).isSame(refDate.add(1, 'day'), 'day') &&
            dayjs(item?.date).hour() === 0)
      )
    case 'WEEKLY':
      return data.filter((item) => dayjs(item?.date).isSame(refDate, 'week'))
    case 'MONTHLY':
      return data.filter((item) => dayjs(item?.date).isSame(refDate, 'month'))
    case 'YEARLY':
      return data.filter((item) => dayjs(item?.date).isSame(refDate, 'year'))
    default:
      return []
  }
}

const totalValueWithData = (data) => {
  console.log(data)
  return data.reduce((prev, current) => prev + current?.value, 0)
}

function TimeCurves(props) {
  const { data, chartType, period } = props

  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [compareDate, setCompareDate] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [compareData, setCompareData] = useState([])
  const [totalKwh, setTotalKwh] = useState('-')
  const [compareTotalKwh, setCompareTotalKwh] = useState()

  useEffect(() => {
    const firstItem = data?.[0]
    const firstDate = dayjs(firstItem?.date)
    firstDate.set('hour', 0)
    setMinDate(firstDate)

    const lastItem = data.pop?.()
    const lastDate = dayjs(lastItem?.date)
    lastDate.set('hour', 0)
    setMaxDate(lastDate)

    setCurrentDate(lastDate)
  }, [data])

  useEffect(() => {
    const filtered =
      data?.length > 0
        ? filterDataWithPeriod(currentDate, period, data, chartType)
        : []
    setFilteredData(filtered)
    const sumTotalKwh = (totalValueWithData(filtered) / 1000).toFixed(0)
    setTotalKwh(sumTotalKwh)

    if (compareDate) {
      const filteredCompare = filterDataWithPeriod(
        compareDate,
        period,
        data,
        chartType
      )
      setCompareData(filteredCompare)

      const sumCompTotalKwh = (
        totalValueWithData(filteredCompare) / 1000
      ).toFixed(0)
      setCompareTotalKwh(sumCompTotalKwh)
    }
  }, [data, currentDate, period, chartType, compareDate])

  const prevDate = useCallback(
    (event) => {
      event.preventDefault()
      const prevDate = dayjs(currentDate).subtract(1, periodUnit(period))
      setCurrentDate(prevDate)
    },
    [currentDate, period]
  )

  const nextDate = useCallback(
    (event) => {
      event.preventDefault()
      const nextDate = dayjs(currentDate).add(1, periodUnit(period))
      setCurrentDate(nextDate)
    },
    [currentDate, period]
  )

  console.log(totalKwh)
  return (
    <Widget>
      <ControlsWrapper>
        <DateControlsWrapper>
          <IconButton
            onClick={prevDate}
            disabled={dayjs(currentDate).isSame(minDate, 'day')}
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
              startAdornment: (
                <IconButton edge="start" size="small">
                  <TodayOutlinedIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton
            onClick={nextDate}
            disabled={dayjs(currentDate).isSame(maxDate, 'day')}
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
            shouldDisableDate={(date) => dayjs(date).isSame(currentDate, 'day')}
            format="DD/MM/YYYY"
            InputProps={{
              startAdornment: (
                <IconButton edge="start" size="small">
                  <TodayOutlinedIcon />
                </IconButton>
              ),
            }}
          />
          {compareDate && (
            <IconButton onClick={() => setCompareDate(null)}>
              <ClearIcon />
            </IconButton>
          )}
        </DateControlsWrapper>
        <CounterWrapper>
          <Counter
            value={totalKwh}
            title="Total diària"
            date={dayjs(currentDate).format('DD/MM/YYYY')}
          />
          {compareDate && (
            <Counter
              value={compareTotalKwh}
              title="Total diària"
              date={dayjs(compareDate).format('DD/MM/YYYY')}
              color="secondary"
            />
          )}
        </CounterWrapper>
      </ControlsWrapper>
      <ChartWrapper>
        {chartType === 'LINE_CHART_TYPE' ? (
          <TimeCurvesLineChart
            data={filteredData}
            compareData={compareData}
            period={period}
          />
        ) : (
          <TimeCurvesBarChart
            data={filteredData}
            compareData={compareData}
            period={period}
          />
        )}
      </ChartWrapper>
    </Widget>
  )
}

export default React.memo(TimeCurves)
