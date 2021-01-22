import moment from 'moment'

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const formatkWh = (item) => {
  return formatNumber(Math.round(item)) + ' kWh'
}

export const formatDecimal = (item, base = 100) => (
  formatNumber(Math.round((item + Number.EPSILON) * base) / base)
)

export const formatkWhDecimal = (item) => {
  return formatDecimal(item) + ' kWh'
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
      return moment(item).format('HH') + 'h'
    case 'WEEKLY':
      return moment(item).format('dddd')
    case 'MONTHLY':
      return moment(item).format('D')
    default:
      return moment(item).format('MMMM')
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

  const formatWithHour = (value) => moment(value).format('DD/MM/YYYY HH') + 'h'

  switch (period) {
    case 'WEEKLY':
      return type === 'barChart' ? moment(value).format('DD/MM/YYYY') : formatWithHour(value)
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
    const days = data.filter(item => moment(item?.date).isoWeekday() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({ date: moment(firstDay).add(day - 1, 'd').toISOString(), value: totalValue })
  }
  return weekly
}

export const groupMonthlyData = (data) => {
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= moment(firstDay).daysInMonth(); day++) {
    const days = data.filter(item => moment(item?.date).date() === day)
    const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
    weekly.push({ date: moment(firstDay).add(day - 1, 'd').toISOString(), value: totalValue })
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
  if (arrData1 > arrData2) {
    return arrData1.map((item, index) => (
      {
        date: item.date,
        value: item.value,
        compValue: arrData2[index]?.value
      }
    ))
  } else {
    return arrData2.map((item, index) => (
      {
        date: item.date,
        value: arrData1[index]?.value,
        compValue: item.value
      }
    ))
  }
}
