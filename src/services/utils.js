import dayjs from 'dayjs'
import i18n from 'i18n/i18n'
import { getPeriod } from 'services/timecurves'

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const formatNumber = (num) => {
  return num.toLocaleString('es-ES')
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
  return `${value}`.replace('.', ',')
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

export const formatTooltipLabel = (period, value, type = 'barChart') => {
  const formatWithHour = (value) => dayjs(value).format('DD/MM/YYYY HH') + 'h'

  switch (period) {
    case 'DAILY':
      return formatWithHour(value)
    case 'WEEKLY':
      return type === 'barChart'
        ? dayjs(value).format('DD/MM/YYYY')
        : formatWithHour(value)
    case 'MONTHLY':
      return type === 'barChart'
        ? dayjs(value).format('DD/MM/YYYY')
        : formatWithHour(value)
    case 'YEARLY':
      return type === 'barChart'
        ? dayjs(value).format('MM/YYYY')
        : formatWithHour(value)
    default:
      return dayjs(value).format('DD/MM/YYYY')
  }
}

export const formatTooltip = (value, unit, decimals) => {
  const asFloat = parseFloat(value)
  if (asFloat % 1 === 0) return [`${asFloat} ${unit}`, null]
  if (isNaN(asFloat)) return [`-- ${unit}`, null]
  const language = i18n.language
  const localized = asFloat.toLocaleString(language, {
    maximumFractionDigits: decimals ?? 2,
    minimumFractionDigits: decimals ?? 2,
    useGrouping: true,
  })

  return [`${localized} ${unit}`, null]
}

export const agregateDates = (dates, agregatedDate, tariffTimetableId) => {
  const base = getBaseKeys(tariffTimetableId)

  const result = {
    date: agregatedDate,
    value: 0,
    ...base,
  }

  dates.forEach((item) => {
    const period = getPeriod(item?.date, tariffTimetableId)
    result[period] += item?.value
    result.value += item?.value
  })

  return result
}

export const groupWeeklyData = (data, tariffTimetableId) => {
  const isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  const weekly = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= 7; day++) {
    const days = data.filter((item) => dayjs(item?.date).isoWeekday() === day)
    const result = agregateDates(
      days,
      dayjs(firstDay)
        .add(day - 1, 'd')
        .valueOf(),
      tariffTimetableId
    )
    weekly.push(result)
  }

  return weekly
}

export const groupDailyData = (data, tariffTimetableId) => {
  return data.map((item) => {
    return agregateDates([item], item?.date, tariffTimetableId)
  })
}

export const groupMonthlyData = (data, tariffTimetableId) => {
  const month = []
  const firstDay = data[0]?.date
  for (let day = 1; day <= dayjs(firstDay).daysInMonth(); day++) {
    const days = data.filter((item) => dayjs(item?.date).date() === day)

    const result = agregateDates(
      days,
      dayjs(firstDay)
        .add(day - 1, 'd')
        .valueOf(),
      tariffTimetableId
    )

    month.push(result)
  }
  return month
}

export const getBaseKeys = (tariffTimetableId, order = 0) => {
  if (tariffTimetableId === 'Taula_Peatges_20') {
    return order === 0
      ? {
        VALLEY: 0,
        PICK: 0,
        FLAT: 0,
      }
      : {
        PICK: 0,
        FLAT: 0,
        VALLEY: 0,
      }
  } else {
    return {
      P1: 0,
      P2: 0,
      P3: 0,
      P4: 0,
      P5: 0,
      P6: 0,
    }
  }
}

export const groupYearlyDataAccumulation = (data, tariffTimetableId) => {
  const base = getBaseKeys(tariffTimetableId, 1)

  const result = { ...base }

  /* Object.keys(data).forEach((element) => {
    const period = getPeriod(element, tariffTimetableId)
    result[period] += data[element]
    result.value += data[element]
  }) */

  data.forEach((element) => {
    const period = getPeriod(element.date, tariffTimetableId)
    result[period] += element.value
    result.value += element.value
  })

  return result
}

export const groupYearlyData = (data, tariffTimetableId) => {
  const base = getBaseKeys(tariffTimetableId)
  const result = {}

  for (let i = 0; i < data.length; i++) {
    const current = dayjs(data[i].date).startOf('month').valueOf()
    if (!result[current]?.value) {
      result[current] = {
        date: current,
        value: 0,
        ...base,
      }
    }

    const period = getPeriod(data[i].date, tariffTimetableId)
    result[current][period] += data[i].value
    result[current].value += data[i].value
  }
  return Object.values(result)
}

export const groupYearlyDataByDay = (data) => {
  const result = {}
  for (let i = 0; i < data.length; i++) {
    const current = dayjs(data[i].date).startOf('day').valueOf()
    if (!result[current]?.value) {
      result[current] = { date: current, value: 0 }
    }
    result[current].value += data[i].value
  }
  return Object.values(result)
}

const weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)

export const domainFromData = (data, period) => {
  const firstDate = dayjs(data?.[0]?.date)
  if (period === 'WEEKLY') {
    return [firstDate.weekday(0).valueOf(), firstDate.weekday(7).valueOf()]
  }

  if (period === 'MONTHLY') {
    return [
      firstDate.date(1).valueOf(),
      firstDate.date(1).add(1, 'month').valueOf(),
    ]
  }

  if (period === 'YEARLY') {
    return [
      firstDate.month(0).date(1).valueOf(),
      firstDate.month(0).date(1).add(1, 'year').valueOf(),
    ]
  }

  return ['auto', 'auto']
}

export const ticksFromData = (data, period) => {
  const firstDate = dayjs(data?.[0]?.date)
  if (period === 'WEEKLY') {
    return [...Array(7).keys()].map((item) => {
      const day = firstDate.weekday(item).valueOf()
      return day
    })
  }

  if (period === 'MONTHLY') {
    return [...Array(firstDate.daysInMonth()).keys()].map((item) => {
      const day = firstDate.date(item + 1)
      return day.valueOf()
    })
  }

  if (period === 'YEARLY') {
    return [...Array(12).keys()].map((item) => {
      const day = firstDate.month(item)
      return day.valueOf()
    })
  }
}

export const groupDataByPeriod = (
  data,
  period,
  type,
  tariffTimetableId = 'Taula_Peatges_20'
) => {
  switch (period) {
    case 'WEEKLY':
      return type === 'barChart'
        ? groupWeeklyData(data, tariffTimetableId)
        : data
    case 'MONTHLY':
      return type === 'barChart'
        ? groupMonthlyData(data, tariffTimetableId)
        : data
    case 'YEARLY':
      return type === 'barChart'
        ? groupYearlyData(data, tariffTimetableId)
        : groupYearlyDataByDay(data)
    default:
      return type === 'barChart'
        ? groupDailyData(data, tariffTimetableId)
        : data
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

export const period2ColorKwhBag = {
  VALLEY: '#76562D',
  FLAT: '#F1A10C',
  PICK: '#E45356',
  P1: '#E45356',
  P2: '#F1A10C',
  P3: '#76562D',
  P4: '#58B9C0',
  P5: '#ED95A1',
  P6: '#706E6F',
}

export const period2Color = {
  VALLEY: '#c4dd8c',
  FLAT: '#96b633',
  PICK: '#f2970f',
  P1: '#E45356',
  P2: '#F1A10C',
  P3: '#76562D',
  P4: '#58B9C0',
  P5: '#ED95A1',
  P6: '#706E6F',
}

export const colorPeriod = (date) => {
  const period = getPeriod(date)
  return period2Color[period]
}

export const CnmcformatData = ({ data, cups }) => {
  const formatedHeaders = [
    { label: 'CUPS', key: 'cups' },
    { label: 'Fecha', key: 'date' },
    { label: 'Hora', key: 'time' },
    { label: 'Consumo_kWh', key: 'value' },
    { label: 'Metodo_obtencion', key: 'state' },
  ]

  const formatedData = data.map(({ date, value }) => ({
    cups,
    date: dayjs(date).format('DD/MM/YYYY'),
    time: dayjs(date).format('H'),
    value: (parseFloat(value) / 1000).toString().replace('.', ','),
    state: 'R',
  }))

  return [formatedHeaders, formatedData]
}

export const convertDataFromWattsToKwh = (data) =>
  data.map(({ value, ...rest }) => {
    const parsedValue = parseFloat(value)
    const convertedValue = Number.isNaN(parsedValue)
      ? value
      : parsedValue / 1000
    return {
      ...rest,
      value: convertedValue,
    }
  })

export const CsvformatData = (data) => {
  const formatedHeaders = data.columns.map((element) => ({
    label: element,
    key: element,
  }))

  const formatedData = data.rows.map((element) => {
    const row = {}
    Object.keys(element).forEach((field, index) => {
      row[data.columns[index]] = element[field]
    })
    return row
  })

  return [formatedHeaders, formatedData]
}

export const kwhRecordToCsvformatData = (data, t) => {
  const columns = [t('DATE'), t('HOUR'), t('PRODUCTION_KWH')]

  const formatedHeaders = columns.map((element) => ({
    label: element,
    key: element,
  }))

  const formatedData = data.map((element) => {
    const dataFormated = dayjs(element.date).format('MM/YYYY')
    const hour = dayjs(element.date).hour()

    const row = {}
    row[columns[0]] = dataFormated
    row[columns[1]] = hour
    row[columns[2]] = element.value

    return row
  })

  return [formatedHeaders, formatedData]
}

export const periodUnit = (period) => {
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

export const labelTotalPeriod = (period) => {
  switch (period) {
    case 'DAILY':
      return 'TOTAL_DAILY'
    case 'WEEKLY':
      return 'TOTAL_WEEKLY'
    case 'MONTHLY':
      return 'TOTAL_MONTHLY'
    case 'YEARLY':
      return 'TOTAL_YEARLY'
    default:
      return ''
  }
}

export const formatOrdinals = (lang, number) => {
  const catSuffix = {
    1: 'r',
    2: 'n',
    3: 'r',
    4: 't',
    other: 'è',
  }

  if (lang === 'ca') {
    const key = number >= 5 ? 'other' : number
    const suffix = catSuffix[key]
    return `${number}${suffix}`
  } else {
    return `${number}${'º'}`
  }
}

export const getDataForTable = (
  assignmentsConsumption,
  data
) => {
  const dataT = {}

  const dataKeys3 = ['P3', 'P2', 'P1']
  const dataKeys6 = ['P6', 'P5', 'P4', 'P3', 'P2', 'P1']

  /*
    data object contains an array of:

    "contract_number": {
        "P2": [kwh value],
        "P3": [kwh value],
        "P1": [kwh value], 
        "address": "[Contract address]" 
    } 
  */

  let total = 0
  
  const lengths = Object.keys(data).map((id) => Object.keys(data[id]).length)
  let maxLength = Math.max(...lengths)
  maxLength = maxLength === 0 ? 3 : maxLength

  dataT.dataKeys = maxLength < 6 ? dataKeys3 : dataKeys6

  function getRowKwh(kwhs) {

    const rowKwh = kwhs
      ? kwhs.reduce(
        (accumulated, currentValue) => accumulated + currentValue,
        0
      )
      : 0
    return rowKwh
  }


  function formattedRow(rowData) {
    return {
      id: rowData.contractNumber + ' - ' + rowData.contractAddress,
      priority: rowData.priority,
      ...rowData.kWhs,
      total: rowData.totalKWh + ' kWh',
    }
  }

  function getEmptyData(kwhs, id) {
    const emptyData = {}
    if (!kwhs || kwhs.length < maxLength) {
      for (let i = kwhs.length; i < maxLength; i++) {
        if (!emptyData[id]) {
          emptyData[id] = {}
        }
        emptyData[id]['P' + (i + 1)] = '-'
      }
    }
    return emptyData
  }

  function comparePriorities(a, b) {
    if (a.priority === '-') {
      return 1
    }
    if (b.priority === '-' || (a.priority < b.priority)) {
      return -1
    }
    if (a.priority > b.priority) {
      return 1
    }
    return 0
  }


  dataT.rows = Object.keys(data).map((dataKey) => {

    const { number, address, ...periods } = data[dataKey]
    const kwhs = Object.values(periods)

    const rowKwh = getRowKwh(kwhs)
    total = total + rowKwh

    const emptyData = getEmptyData(kwhs, dataKey)

    const dataTmpCopy = JSON.parse(JSON.stringify(data[dataKey]))
    Object.keys(dataTmpCopy).forEach((id) => {
      dataTmpCopy[id] = dataTmpCopy[id] + ' kWh'
    })

    const tmpData = { ...dataTmpCopy, ...emptyData[dataKey] }
    const newData = {}
    dataT.dataKeys.forEach((element) => {
      newData[element] = tmpData[element] || '-'
    })

    let contractAddress = ''
    let priority = ''
    let contractNumber = ''

    const assignment = assignmentsConsumption.find(obj => {
      const contractNumber = obj.contract.split('-')[1]
      return parseInt(contractNumber) === parseInt(dataKey)
    })
    if (assignment) {
      contractNumber = assignment?.contract.split('-')[1]
      contractAddress = assignment?.contract_address
      priority = assignment.priority
    }
    else {
      contractAddress = data[dataKey].address
      contractNumber = dataKey
      priority = '-'
    }

    return formattedRow({ contractAddress: contractAddress, contractNumber: contractNumber, priority: priority, kWhs: newData, totalKWh: rowKwh })
  })

  dataT.rows = dataT.rows.sort(comparePriorities)
  dataT.total = total
  
  return { data: dataT }
}

export function generationKwhRecordData(khwRecordData, periods, t) {
  const groupData = groupDataByPeriod(
    khwRecordData,
    'YEARLY',
    'barChart',
    periods
  )

  const keys = getBaseKeys(periods, 1)
  let total = 0
  const data = { periods: [], fills: {}, keys: [], total: 0 }

  Object.keys(groupData).forEach((element) => {
    const tmpObj = {}

    Object.keys(groupData[element]).forEach((elKey) => {
      tmpObj[t(getCodeToText(elKey))] = groupData[element][elKey]
      data.fills[t(getCodeToText(elKey))] = period2ColorKwhBag[elKey]
    })
    total = total + tmpObj.value
    data.periods.push(tmpObj)
  })
  data.keys = Object.keys(keys).map((element) => t(getCodeToText(element)))
  data.total = total

  return data
}

export function getCodeToText(code) {
  if (code === 'VALLEY' || code === 'PICK' || code === 'FLAT') {
    code = code + '_P'
  }
  return code
}
