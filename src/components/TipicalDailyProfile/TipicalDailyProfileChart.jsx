import React from 'react'

import { ResponsiveContainer } from 'recharts'
import { SummaryPeriodChart } from '@somenergia/somenergia-ui'

const colorPeriods = (hour, isWeekend) => {
  if (isWeekend || (hour >= 0 && hour < 8)) return 'vall'

  return (hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)
    ? 'punta'
    : 'pla'
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
      vall: '#c4dd8c',
      punta: '#f2970f',
      pla: '#96b633',
    },
    keys: ['vall', 'punta', 'pla'],
    periods: periods,
  }
}

const TipicalDailyProfileChart = ({ data = [], lang = 'es' }) => {
  const bardata = transformBardata(data)

  console.log('bardata', bardata)
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
