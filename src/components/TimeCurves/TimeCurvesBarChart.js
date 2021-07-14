import React from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label
} from 'recharts'

import {
  formatXAxis,
  formatTooltip,
  formatTooltipLabel,
  groupDataByPeriod,
} from '../../services/utils'

function TimeCurvesBarChart({ data, period }) {
  const groupedData = groupDataByPeriod(data, period, 'barChart')

  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={groupedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(tickItem) => formatXAxis(period, tickItem)}
            tick={{ fontSize: 16, transform: 'translate(0, 8)' }}
            padding={{ left: 24, right: 24 }}
          />
          <YAxis
            type="number"
            domain={[0, 'auto']}
            axisLine={false}
            tickCount={7}
            width={75}
            tickLine={false}
            tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)}`}
            tick={{ fontSize: 16, transform: 'translate(0, 0)' }}
          >
            <Label
              value="kWh"
              angle={-90}
              position="insideLeft"
              fill="#969696"
            />
          </YAxis>          

          <Tooltip
            formatter={formatTooltip}
            labelFormatter={(value) => formatTooltipLabel(period, value)}
            cursor={{ fill: '#f2f2f2bb' }}
          />
          <Bar dataKey="value" fill="#96b633" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesBarChart
