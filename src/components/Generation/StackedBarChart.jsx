import React from 'react'

import { SummaryPeriodChart } from '@somenergia/somenergia-ui'

import { ResponsiveContainer } from 'recharts'

function transformBardata(data) {
  let periods = data.periods
  periods['date'] = new Date().setHours(0)
  return {
    fills: data.fills,
    keys: Object.keys(data.fills),
    periods: [periods],
  }
}

const StackedBarChart = ({ data }) => {
  const bagdata = transformBardata(data)
  return (
    <div>
      <ResponsiveContainer>
        <SummaryPeriodChart
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          data={bagdata}
          period="DAILY"
          legend={true}
          showTooltipKeys={true}></SummaryPeriodChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChart
