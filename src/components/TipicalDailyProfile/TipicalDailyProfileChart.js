import React from 'react'

import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  Label,
} from 'recharts'
import { formatDecimal, formatNumber } from '../../services/utils'

const zeroPad = (num, places) => String(num).padStart(places, '0')

const formatXAxis = (tickItem) => {
  return zeroPad(tickItem, 2) + 'h'
}

const formatTooltip = (value, name) => {
  return [name, formatDecimal(value, 1000)]
}

const formatLabel = (value) => {
  return formatXAxis(value)
}

const colorPeriod = (hour, isWeekend) => {
  if (isWeekend || (hour >= 0 && hour < 8)) return '#c4dd8c'

  return (hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)
    ? '#f2970f'
    : '#96b633'
}

const TipicalDailyProfileChart = ({ data }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#a1a1a1" vertical={false} />
          <XAxis
            dataKey="hour"
            tickFormatter={formatXAxis}
            tick={{ transform: 'translate(0, 8)' }}
          />
          <YAxis
            axisLine={false}
            tickCount={6}
            tickLine={false}
            tickFormatter={(tickItem) => `${formatNumber(tickItem)}`}
            tick={{ transform: 'translate(-2, 0)' }}
          >
            ç
            <Label
              value="kWh"
              angle={-90}
              position="insideLeft"
              fill="#969696"
            />
          </YAxis>
          <Tooltip
            cursor={{ fill: '#f2f2f2' }}
            formatter={formatTooltip}
            labelFormatter={formatLabel}
            separator=" "
          />
          {data !== undefined ? (
            <Bar dataKey="kWh">
              {data.map((entry, index) => (
                <Cell key={index} fill={colorPeriod(entry?.hour)} />
              ))}
            </Bar>
          ) : (
            ''
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
