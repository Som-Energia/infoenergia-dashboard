import React from 'react'
import moment from 'moment'

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function TimeCurvesLineChart ({ data }) {
  const formatXAxis = (tickItem) => {
    return moment(tickItem).format('HH') + 'h'
  }

  const formatTooltipLabel = (value) => {
    return moment(value).format('DD/MM/YYYY HH') + 'h'
  }

  const formatTooltip = (value, name, props) => (['kWh', value / 1000])

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={6} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={formatTooltipLabel} />
          <Line type="monotone" dataKey="value" stroke="#96b633" dot={false} strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesLineChart
