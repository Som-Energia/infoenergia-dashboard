import dayjs from 'dayjs'

const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

const { INFOENERGIA_API_URL, WEBFORMS_API_URL } = window.config
  ? window.config
  : {
      // Just for testing
      INFOENERGIA_API_URL: 'caca',
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

export function getPeriod(datetime, timetable='LowPower') {
  const periodTimes = periodes[timetable].times
  datetime = dayjs(datetime)
  const seasonPeriods = periodes[timetable].seasons[datetime.month()+1]
  const lesserPeriod = seasonPeriods[seasonPeriods.length - 1]
  // weekdays
  const day = datetime.isoWeekday()
  if (day >= 6) return lesserPeriod
  // holidays
  const isodate = datetime.format('YYYY-MM-DD')
  if (MARKET_HOLIDAYS.includes(isodate)) return lesserPeriod
  // labour days by time
  const dailySequence = [2, 1, 0, 1, 0, 1]
  const hour = datetime.hour()
  for (let i = 0; i < dailySequence.length; i++) {
    const timeuntil = periodTimes[i]
    if (hour < timeuntil) {
      return seasonPeriods[dailySequence[i]]
    }
  }
  // TODO: untested
  return lesserPeriod
}

const lowPowerPeriodTimes = [8, 10, 14, 18, 22, 24]
const peninsularPeriodTimes = [8, 9, 14, 18, 22, 24]
const insularPeriodTimes = [8, 10, 15, 18, 22, 24]

const periodes = {
  LowPower: {
    times: lowPowerPeriodTimes,
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
  Peninsular: {
    times: peninsularPeriodTimes,
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
  Balearic: {
    times: insularPeriodTimes,
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
  Canary: {
    times: insularPeriodTimes,
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
