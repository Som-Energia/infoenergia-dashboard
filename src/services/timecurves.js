import dayjs from 'dayjs'

const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

const { INFOENERGIA_API_URL, WEBFORMS_API_URL } = window.config? window.config : {
  // Just for testing
  INFOENERGIA_API_URL:'caca',
  WEBFORMS_API_URL: 'caca',
}


export let MARKET_HOLIDAYS = []

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

//export function getPeriod(tariff, zone, datetime) {}

// TODO: This is a Mock!!!!
export function getPeriod(datetime) {
  const periodSequence = ['valley', 'flat', 'peak', 'flat', 'peak', 'flat']
  const generalPeriodTimes = [8, 10, 14, 18, 22, 24]
  datetime = dayjs(datetime)
  const day = datetime.isoWeekday()
  if (day >= 6) return periodSequence[0] // 'valley'
  const isodate = datetime.format('YYYY-MM-DD')
  if (MARKET_HOLIDAYS.includes(isodate)) return periodSequence[0] // 'valley'
  const hour = datetime.hour()
  for (let i = 0; i < periodSequence.length; i++) {
    const timeuntil = generalPeriodTimes[i]
    if (hour < timeuntil) {
      return periodSequence[i]
    }
  }
  return periodSequence.slice(-1)
  // valley, peak, flat
  /*
  datetime = dayjs(datetime)
  const day = datetime.isoWeekday()
  if (day >= 6) return 'valley'
  const isodate = datetime.format('YYYY-MM-DD')
  if (MARKET_HOLIDAYS.includes(isodate)) return 'valley'
  const hour = datetime.hour()
  const periodStructureName = 'LowPower' // TODO
  const periodStructure = periodes[periodStructureName]
  const month = datetime.month() + 1
  const [peak, flat, valley] = periodStructure.seasons[month]
  const periodSequence = [valley, flat, peak, flat, peak, flat]
  for (let i = 0; i < periodSequence.length; i++) {
    const timeuntil = periodStructure.times[i]
    if (hour < timeuntil) {
      return periodSequence[i]
    }
  }
  return periodSequence.slice(-1)
  */
}

var generalPeriodTimes = [8, 10, 14, 18, 22, 24]
var specialPeriodTimes = [8, 9, 14, 18, 22, 24]

var periodes = {
  LowPower: {
    times: generalPeriodTimes,
    seasons: {
      1: ['peak', 'flat', 'valley'],
      2: ['peak', 'flat', 'valley'],
      3: ['peak', 'flat', 'valley'],
      4: ['peak', 'flat', 'valley'],
      5: ['peak', 'flat', 'valley'],
      6: ['peak', 'flat', 'valley'],
      7: ['peak', 'flat', 'valley'],
      8: ['peak', 'flat', 'valley'],
      9: ['peak', 'flat', 'valley'],
      10: ['peak', 'flat', 'valley'],
      11: ['peak', 'flat', 'valley'],
      12: ['peak', 'flat', 'valley'],
    },
  },
  Peninsula: {
    times: specialPeriodTimes,
    seasons: {
      1: ['P1', 'P2', 'P6'],
      2: ['P1', 'P2', 'P6'],
      3: ['P2', 'P3', 'P6'],
      4: ['P4', 'P5', 'P6'],
      5: ['P4', 'P5', 'P6'],
      6: ['P3', 'P4', 'P6'],
      7: ['P1', 'P2', 'P6'],
      8: ['P3', 'P4', 'P6'],
      9: ['P3', 'P4', 'P6'],
      10: ['P4', 'P5', 'P6'],
      11: ['P2', 'P3', 'P6'],
      12: ['P1', 'P2', 'P6'],
    },
  },
  Balears: {
    times: generalPeriodTimes,
    seasons: {
      1: ['P3', 'P4', 'P6'],
      2: ['P3', 'P4', 'P6'],
      3: ['P4', 'P5', 'P6'],
      4: ['P4', 'P5', 'P6'],
      5: ['P2', 'P3', 'P6'],
      6: ['P1', 'P2', 'P6'],
      7: ['P1', 'P2', 'P6'],
      8: ['P1', 'P2', 'P6'],
      9: ['P1', 'P2', 'P6'],
      10: ['P2', 'P3', 'P6'],
      11: ['P4', 'P5', 'P6'],
      12: ['P3', 'P4', 'P6'],
    },
  },
  Canaries: {
    times: generalPeriodTimes,
    seasons: {
      1: ['P2', 'P4', 'P6'],
      2: ['P2', 'P4', 'P6'],
      3: ['P2', 'P4', 'P6'],
      4: ['P4', 'P5', 'P6'],
      5: ['P4', 'P5', 'P6'],
      6: ['P4', 'P5', 'P6'],
      7: ['P1', 'P3', 'P6'],
      8: ['P1', 'P3', 'P6'],
      9: ['P1', 'P3', 'P6'],
      11: ['P2', 'P3', 'P6'],
      12: ['P2', 'P3', 'P6'],
    },
  },
}
