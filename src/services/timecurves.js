import dayjs from 'dayjs'

const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

const { INFOENERGIA_API_URL, WEBFORMS_API_URL } = window.config
let MARKET_HOLIDAYS = []

export function getTimeCurves({ cups, token, currentMonth }) {
  return fetch(`${INFOENERGIA_API_URL}/CCHFact/${cups}/${currentMonth}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMarketHolidays() {
  const today = dayjs().format('YYYY-MM-DD')
  return fetch(`${WEBFORMS_API_URL}/data/marketholidays?to=${today}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

getMarketHolidays().then((holidays) => {
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
  if (hour < 24) return 'flat'
  return 'valley'
}
