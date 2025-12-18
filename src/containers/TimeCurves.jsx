import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import dayjs from 'dayjs'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Counter from '../components/Counter'
import TimeCurvesBarChart from '../components/TimeCurves/TimeCurvesBarChart'
import TimeCurvesLineChart from '../components/TimeCurves/TimeCurvesLineChart'
import LegendPeriod from '../components/TipicalDailyProfile/LegendPeriod'

import TimeCurvesContext from '../contexts/TimeCurvesContext'
import Loading from '../components/Loading'

import { labelTotalPeriod, convertDataFromWattsToKwh } from '../services/utils'
import CustomDatePicker from '../components/CustomDatePicker/CustomDatePicker'

const filterDataWithPeriod = ({ refDate, period, data }) => {
  const filteredData = []
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
      for (let i = 0; i < data.length; i++) {
        if (dayjs(data[i]?.date).isSame(refDate, 'year')) {
          filteredData.push(data[i])
        }
      }
      return filteredData
    default:
      return []
  }
}

const totalValueWithData = (data) => {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total += data[i]?.value || 0
  }
  return total
}

function TimeCurves(props) {
  const { data, chartType, period, contract } = props
  const { t } = useTranslation()

  const { filteredTimeCurves, setFilteredTimeCurves } =
    useContext(TimeCurvesContext)

  const [minDate, setMinDate] = useState(dayjs())
  const [maxDate, setMaxDate] = useState(dayjs())
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [compareDate, setCompareDate] = useState(null)
  const [compareData, setCompareData] = useState([])
  const [totalKwh, setTotalKwh] = useState('-')
  const [compareTotalKwh, setCompareTotalKwh] = useState()

  useEffect(() => {
    const firstItem = data?.[0]
    const firstDate = dayjs(firstItem?.date)
    firstDate.startOf('day')

    const lastItem = data?.[data.length - 1]
    let lastDate = dayjs(lastItem?.date)
    if (lastDate.hour() === 0) {
      lastDate = lastDate.subtract(1, 'hour')
    }
    lastDate.startOf('day')

    setMinDate(firstDate)
    setMaxDate(lastDate)
    setCurrentDate(lastDate)
  }, [data])

  useEffect(() => {
    const filtered =
      data?.length > 0
        ? filterDataWithPeriod({
          refDate: currentDate,
          period,
          data,
          chartType,
        })
        : []
    setFilteredTimeCurves(filtered)
    const sumTotalKwh = (totalValueWithData(filtered) / 1000).toFixed(0)
    setTotalKwh(sumTotalKwh)

    if (compareDate) {
      const filteredCompare = filterDataWithPeriod({
        refDate: compareDate,
        period,
        data,
        chartType,
      })
      setCompareData(filteredCompare)

      const sumCompTotalKwh = (
        totalValueWithData(filteredCompare) / 1000
      ).toFixed(0)
      setCompareTotalKwh(sumCompTotalKwh)
    } else {
      setCompareData([])
    }
  }, [data, currentDate, period, chartType, compareDate])

  return (
    <Widget>
      {
        <>
          <ControlsWrapper>
            <DateControlsWrapper>
              <CustomDatePicker
                prevNextButtons={true}
                minDate={minDate}
                maxDate={maxDate}
                selectedDate={currentDate}
                handleDateChange={setCurrentDate}
              />
              {chartType === 'LINE_CHART_TYPE' && (
                <>
                  <CustomDatePicker
                    prevNextButtons={false}
                    minDate={minDate}
                    maxDate={maxDate}
                    selectedDate={compareDate}
                    handleDateChange={setCompareDate}
                    shouldDisableDate={(date) => dayjs(date).isSame(currentDate, 'day')}
                  ></CustomDatePicker>
                  {compareDate && (
                    <IconButton onClick={() => setCompareDate(null)} size="large">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </>
              )}
            </DateControlsWrapper>
            <CounterWrapper>
              <Counter
                value={totalKwh}
                title={t(labelTotalPeriod(period))}
                date={dayjs(currentDate).format('DD/MM/YYYY')}
              />
              {chartType === 'LINE_CHART_TYPE' && compareDate && (
                <Counter
                  value={compareTotalKwh}
                  title={t(labelTotalPeriod(period))}
                  date={dayjs(compareDate).format('DD/MM/YYYY')}
                  color="secondary"
                />
              )}
            </CounterWrapper>
          </ControlsWrapper>
          <ChartWrapper>
            {!data.length ? (
              <Loading />
            ) : chartType === 'LINE_CHART_TYPE' ? (
              <TimeCurvesLineChart
                data={convertDataFromWattsToKwh(filteredTimeCurves)}
                compareData={convertDataFromWattsToKwh(compareData)}
                period={period}
              />
            ) : (
              <TimeCurvesBarChart
                data={convertDataFromWattsToKwh(filteredTimeCurves)}
                compareData={convertDataFromWattsToKwh(compareData)}
                period={period}
                tariffTimetableId={contract?.tariff_timetable_id}
              />
            )}
          </ChartWrapper>
          {chartType === 'BAR_CHART_TYPE' && <LegendPeriod contract={contract} />}
        </>
      }
    </Widget>
  );
}

export default React.memo(TimeCurves)

const ControlsWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`
const CounterWrapper = styled.div`
  display: flex;
  gap: 8px;
`
const DateControlsWrapper = styled.div`
  padding-top: 0;
  display: flex;
  align-items: center;
`

const ChartWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
  min-height: 450px;
`

export const Widget = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 16px 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 16px;
  }
  background-color: #fff;
  border-radius: 0;
`
