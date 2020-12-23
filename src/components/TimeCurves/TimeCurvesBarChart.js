import React from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import {
  formatXAxis,
  formatTooltip,
  formatTooltipLabel,
  groupDataByPeriod
} from '../../services/utils'

function TimeCurvesBarChart ({ data, period }) {
  const groupedData = groupDataByPeriod(data, period, 'barChart')

  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={groupedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" tickFormatter={ (tickItem) => formatXAxis(period, tickItem)} tick={{ fontSize: 12, transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={10} tick={{ fontSize: 12 }} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={(value) => formatTooltipLabel(period, value)} />
          <Bar dataKey="value" barSize={24} fill="#96b633" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesBarChart
