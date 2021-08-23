import dayjs from 'dayjs'

const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

const TOKEN = 'ecada804a8884a67960726dbf983aeda451355d1ae2d4af69854dd7e0d182761'
const { INFOENERGIA_API_URL, WEBFORMS_API_URL } = window.config
const CUPS = 'ES0031406238503003AP0F'
const currentMonth = '202106'
let MARKET_HOLIDAYS = []

const headers = new Headers({
  Authorization: `token ${TOKEN}`,
  'Content-Type': 'application/json',
})

export function getTimeCurves() {
  return fetch(`${INFOENERGIA_API_URL}/CCHFact/${CUPS}/${currentMonth}`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMarketHolidays() {
  const today = dayjs().format('YYYY-MM-DD')
  return fetch(`${WEBFORMS_API_URL}/data/marketholidays?to=${today}`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

getMarketHolidays()
  .then((holidays) => {
    MARKET_HOLIDAYS = holidays?.data || []
  })

// TODO: This is a Mock!!!!
export function getPeriod(date) {
  // valley, peak, flat
  date = dayjs(date)
  const day = date.isoWeekday()
  if (day >= 6) return 'valley'
  const isodate = date.format('YYYY-MM-DD')
  if (MARKET_HOLIDAYS.includes(isodate)) return 'valley'
  const hour = date.hour()
  if (hour < 8) return 'valley'
  if (hour < 10) return 'flat'
  if (hour < 14) return 'peak'
  if (hour < 18) return 'flat'
  if (hour < 22) return 'peak'
  return 'valley'
}
