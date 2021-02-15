import * as dayjs from 'dayjs'

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const formatDay = (weekDay) => {
  var isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  return dayjs().isoWeekday(weekDay).format('dddd')
}

export const formatDayHour = (day, hour) => {
  var isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  return dayjs().hour(hour).isoWeekday(day).format('dddd hh')
}

export const formatkWh = (item) => {
  return formatNumber(Math.round(item)) + ' kWh'
}

export const formatDecimal = (item, base = 100) => (
  formatNumber(Math.round((item + Number.EPSILON) * base) / base)
)

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
      return 24
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
      return type === 'barChart' ? dayjs(value).format('DD/MM/YYYY') : formatWithHour(value)
    default:
      return formatWithHour(value)
  }
}

export const formatTooltip = (value) => {
  return [`${value / 1000} kWh`, null]
}

export const groupWeeklyData = (data) => {
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= 7; day++) {
    const days = data.filter(item => dayjs(item?.date).isoWeekday() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({ date: dayjs(firstDay).add(day - 1, 'd').toISOString(), value: totalValue })
  }
  return weekly
}

export const groupMonthlyData = (data) => {
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= dayjs(firstDay).daysInMonth(); day++) {
    const days = data.filter(item => dayjs(item?.date).date() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({ date: dayjs(firstDay).add(day - 1, 'd').toISOString(), value: totalValue })
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
  return (arrData1 > arrData2)
    ? arrData1.map((item, index) => (
      {
        date: item.date,
        value: item.value,
        compValue: arrData2[index]?.value
      }
    ))
    : arrData2.map((item, index) => (
      {
        date: item.date,
        value: arrData1[index]?.value,
        compValue: item.value
      }
    ))
}
