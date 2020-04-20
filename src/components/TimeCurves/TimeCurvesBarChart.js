import React from 'react'
import moment from 'moment'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function TimeCurvesBarChart ({ data }) {
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
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={6} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={formatTooltipLabel} />
          <Bar dataKey="value" barSize={24} fill="#96b633" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesBarChart
