import dayjs from 'dayjs'

const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

const HEMAN_API_URL = document.getElementById('root')
  ? document.getElementById('root').dataset.hemanApiUrl
  : null // For tests
const WEBFORMS_API_URL = document.getElementById('root')
  ? document.getElementById('root').dataset.webformsApiUrl
  : null // For tests

export let MARKET_HOLIDAYS = []

export function getTimeCurves({ cups, token, currentMonth }) {
  return fetch(`${HEMAN_API_URL}/CCHFact/${cups}/${currentMonth}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('getTimeCurves', error)
      return []
    })
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

export function getPeriod(datetime, tariffTimetableId = 'Taula_Peatges_20') {
  const periodTimes = periodes[tariffTimetableId].times
  datetime = dayjs(datetime)
  const seasonPeriods = periodes[tariffTimetableId].seasons[datetime.month() + 1]
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

export function getMonthCode(num) {
  const months = {
    1: 'MONTH_NAME_1',
    2: 'MONTH_NAME_2',
    3: 'MONTH_NAME_3',
    4: 'MONTH_NAME_4',
    5: 'MONTH_NAME_5',
    6: 'MONTH_NAME_6',
    7: 'MONTH_NAME_7',
    8: 'MONTH_NAME_8',
    9: 'MONTH_NAME_9',
    10: 'MONTH_NAME_10',
    11: 'MONTH_NAME_11',
    12: 'MONTH_NAME_12',
    13: 'ALL_YEAR',
  }
  return months[num]
}

export function getIntervalsFromZone(zone) {
  const intervals = []
  let firstTime = 0
  const currentZone = periodes[zone]
  currentZone.times.forEach((hour) => {
    intervals.push({ start: firstTime, end: hour })
    firstTime = hour
  })
  return intervals
}

export function getLegendFromTimeTable(zone) {
  const intervals = getIntervalsFromZone(zone)
  const currentZone = periodes[zone]
  const groupingPeriodMonth = {}
  const weekendAndHolidays = []
  Object.keys(currentZone.seasons).forEach((season) => {
    const groupPeriods = currentZone.seasons[season]
    const intervalPeriods = []

    if (groupingPeriodMonth[groupPeriods.join('-')]) {
      groupingPeriodMonth[groupPeriods.join('-')].months.push(
        getMonthCode(season)
      )
      if (groupingPeriodMonth[groupPeriods.join('-')].months.length === 12) {
        groupingPeriodMonth[groupPeriods.join('-')].months = [getMonthCode(13)]
      }
    } else {
      intervals.forEach((interval, index) => {
        const period =
          index === 0
            ? groupPeriods[2]
            : index % 2 === 0
            ? groupPeriods[0]
            : groupPeriods[1]
        intervalPeriods.push({ ...interval, period: period })
        if (weekendAndHolidays.length !== intervals.length) {
          weekendAndHolidays.push({ ...interval, period: groupPeriods[2] })
        }
      })

      const periodInfo = {
        months: [getMonthCode(season)],
        intervalPeriods: intervalPeriods,
      }
      groupingPeriodMonth[groupPeriods.join('-')] = periodInfo
    }
  })

  groupingPeriodMonth.weekendHolidays = {
    months: [getMonthCode(13)],
    intervalPeriods: weekendAndHolidays,
  }

  return {
    intervals: intervals,
    groupingPeriodMonth: groupingPeriodMonth,
  }
}

const lowPowerPeriodTimes = [8, 10, 14, 18, 22, 24]
const peninsularPeriodTimes = [8, 9, 14, 18, 22, 24]
const insularPeriodTimes = [8, 10, 15, 18, 22, 24]

const periodes = {
  Taula_Peatges_20: {
    times: lowPowerPeriodTimes,
    seasons: {
      1: ['PICK', 'FLAT', 'VALLEY'],
      2: ['PICK', 'FLAT', 'VALLEY'],
      3: ['PICK', 'FLAT', 'VALLEY'],
      4: ['PICK', 'FLAT', 'VALLEY'],
      5: ['PICK', 'FLAT', 'VALLEY'],
      6: ['PICK', 'FLAT', 'VALLEY'],
      7: ['PICK', 'FLAT', 'VALLEY'],
      8: ['PICK', 'FLAT', 'VALLEY'],
      9: ['PICK', 'FLAT', 'VALLEY'],
      10: ['PICK', 'FLAT', 'VALLEY'],
      11: ['PICK', 'FLAT', 'VALLEY'],
      12: ['PICK', 'FLAT', 'VALLEY'],
    },
  },
  Taula_Peatges_30_60_Peninsular: {
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
  Taula_Peatges_30_60_Balears: {
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
  Taula_Peatges_30_60_Canaries: {
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
      10: ['P1', 'P3', 'P6'],
      11: ['P2', 'P3', 'P6'],
      12: ['P2', 'P3', 'P6'],
    },
  },
}
