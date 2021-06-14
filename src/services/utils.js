import * as dayjs from 'dayjs'

export const formatNumber = (num) => {
  return num.toLocaleString()
}

export const formatDay = (weekDay) => {
  const isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  return dayjs().isoWeekday(weekDay).format('dddd')
}

export const formatDayHour = (day, hour) => {
  const isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  return dayjs().hour(hour).isoWeekday(day).format('dddd HH')
}

export const formatkWh = (item) => {
  return formatNumber(Math.round(item)) + ' kWh'
}

export const formatDecimal = (item, base = 100) =>
  formatNumber(Math.round((item + Number.EPSILON) * base) / base)

export const formatkWhDecimal = (item, base = undefined) => {
  return formatDecimal(item, base) + ' kWh'
}

export const formatPerc = (item) => {
  return Math.round(item) + '%'
}

export const formatEuros = (item) => {
  const value = item || '-'
  return (value + ' €').replace('.', ',')
}

export const formatXAxis = (period, item) => {
  switch (period) {
    case 'DAILY':
      return dayjs(item).format('HH') + 'h'
    case 'WEEKLY':
      return dayjs(item).format('dddd')
    case 'MONTHLY':
      return dayjs(item).format('D')
    default:
      return dayjs(item).format('MMMM')
  }
}

export const tickCount = (period, value) => {
  switch (period) {
    case 'DAILY':
      return 25
    case 'WEEKLY':
      return 7
    case 'MONTHLY':
      return 30
    default:
      return 12
  }
}

export const formatTooltipLabel = (period, value, type = 'barChart') => {
  const formatWithHour = (value) => dayjs(value).format('DD/MM/YYYY HH') + 'h'

  switch (period) {
    case 'WEEKLY':
      return type === 'barChart'
        ? dayjs(value).format('DD/MM/YYYY')
        : formatWithHour(value)
    default:
      return formatWithHour(value)
  }
}

export const formatTooltip = (value) => {
  return [`${value / 1000} kWh`, null]
}

export const groupWeeklyData = (data) => {
  const isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= 7; day++) {
    const days = data.filter((item) => dayjs(item?.date).isoWeekday() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({
      date: dayjs(firstDay)
        .add(day - 1, 'd')
        .toISOString(),
      value: totalValue,
    })
  }
  return weekly
}

export const groupMonthlyData = (data) => {
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= dayjs(firstDay).daysInMonth(); day++) {
    const days = data.filter((item) => dayjs(item?.date).date() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({
      date: dayjs(firstDay)
        .add(day - 1, 'd')
        .toISOString(),
      value: totalValue,
    })
  }
  return weekly
}

export const groupDataByPeriod = (data, period, type) => {
  switch (period) {
    case 'WEEKLY':
      return type === 'barChart' ? groupWeeklyData(data) : data
    case 'MONTHLY':
      return type === 'barChart' ? groupMonthlyData(data) : data
    case 'YEARLY':
      return groupMonthlyData(data)
    default:
      return data
  }
}

export const mergeData = (arrData1 = [], arrData2 = []) => {
  return arrData1 > arrData2
    ? arrData1.map((item, index) => ({
        date: item.date,
        value: item.value,
        compValue: arrData2[index]?.value,
      }))
    : arrData2.map((item, index) => ({
        date: item.date,
        value: arrData1[index]?.value,
        compValue: item.value,
      }))
}

export const completeYearData = (origData) => {
  const data = [...origData]
  const now = new Date()
  const firstDate = data.length ? new Date(data[0].date) : now
  const lastDate = data.length ? new Date(data[data.length - 2].date) : now

  // Introduim valors 0 per completar els anys naturals
  const oneDay = 24 * 60 * 60 * 1000
  const currYearFirst = firstDate // d3.timeYear()
  const currYearLast = lastDate // d3.timeYear()
  const nextYear = new Date(
    new Date(currYearLast.getTime()).getFullYear() + 1,
    0,
    1
  )
  console.log(nextYear)
  const lastYear = new Date(
    new Date(currYearFirst.getTime()).getFullYear() - 1,
    12,
    0
  )

  const diffDaysNext = Math.round(
    Math.abs((lastDate.getTime() - nextYear.getTime()) / oneDay)
  )
  const diffDaysLast = Math.round(
    Math.abs((lastYear.getTime() - firstDate.getTime()) / oneDay)
  )

  for (let i = diffDaysLast; i > 0; i--) {
    const date = dayjs(lastYear).add(i, 'd')
    for (let j = 0; j < 24; j++) {
      const dateWithHour = dayjs(date).add(j, 'h')
      data.unshift({ date: dateWithHour.valueOf(), value: null })
    }
  }

  for (let i = 1; i < diffDaysNext; i++) {
    const date = dayjs(lastDate).add(i, 'd')
    for (let j = 0; j < 24; j++) {
      const dateWithHour = dayjs(date).add(j, 'h')
      data[data.length] = { date: dateWithHour.valueOf(), value: null }
    }
  }

  return data
}
