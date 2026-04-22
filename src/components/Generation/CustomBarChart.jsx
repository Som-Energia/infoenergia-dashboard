import React from 'react'

import { SummaryPeriodChart } from '@somenergia/somenergia-ui'

import { ResponsiveContainer } from 'recharts'

function CustomBarChart({ data, period, legend = false }) {
  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <SummaryPeriodChart
          width={730}
          height={250}
          data={data}
          period={period}
          legend={legend}
          showTooltipKeys={true}></SummaryPeriodChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
