import React from 'react'
import { ResponsiveContainer } from 'recharts'
import { SummaryPeriodChart } from '@somenergia/somenergia-ui'

function CustomBarChart({ data, period, legend = false }) {
  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <SummaryPeriodChart width={730} height={250}
          data={data}
          period={period}
          legend={legend}
          showTooltipKeys={true}>
        </SummaryPeriodChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart