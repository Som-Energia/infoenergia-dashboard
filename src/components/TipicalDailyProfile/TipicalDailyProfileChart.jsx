import React from 'react'

import { ResponsiveContainer } from 'recharts'
import { SummaryPeriodChart } from '@somenergia/somenergia-ui'
import { period2Color } from '../../services/utils'

const colorPeriods = (hour, isWeekend) => {
  if (isWeekend || (hour >= 0 && hour < 8)) return 'VALLEY'

  return (hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)
    ? 'PICK'
    : 'FLAT'
}

function transformBardata(data) {
  let periods = []
  data.forEach((item) => {
    let newItem = {}
    newItem['date'] = new Date().setHours(item.hour)
    const colorItem = colorPeriods(item.hour, false)
    newItem[colorItem] = Math.round((item.kWh + Number.EPSILON) * 1000) / 1000
    periods.push(newItem)
  })
  return {
    fills: {
      VALLEY: period2Color['VALLEY'],
      PICK: period2Color['PICK'],
      FLAT: period2Color['FLAT'],
    },
    keys: ['VALLEY', 'PICK', 'FLAT'],
    periods: periods,
  }
}

const TipicalDailyProfileChart = ({ data = [], lang = 'es' }) => {
  const bardata = transformBardata(data)

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
          <SummaryPeriodChart width={730} height={250}
            data={bardata}
            period="DAILY"
            Ylegend={'kWh'}
            legend={false}
            lang={lang}
            showTooltipKeys={false}
          />
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
