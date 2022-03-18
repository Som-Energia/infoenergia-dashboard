import React from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from 'recharts'

import {
  formatXAxis,
  formatTooltip,
  formatTooltipLabel,
  groupDataByPeriod,
  period2Color,
  formatDecimal,
} from 'services/utils'

function TimeCurvesBarChart({ data, period, compareData = [] }) {
  const groupedData = groupDataByPeriod(data, period, 'barChart')

  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={groupedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(tickItem) => formatXAxis(period, tickItem)}
            tick={{ fontSize: '1rem', transform: 'translate(0, 8)' }}
            padding={{ left: 24, right: 24 }}
          />
          <YAxis
            type="number"
            domain={[0, 'auto']}
            axisLine={false}
            tickCount={7}
            width={75}
            tickLine={false}
            tickFormatter={(tickItem) => `${formatDecimal(tickItem / 1000)}`}
            tick={{ fontSize: '1rem', transform: 'translate(0, 0)' }}
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
            contentStyle={{ fontWeight: 'bold' }}
          />
          {groupedData &&
            Object.keys(period2Color).map((key) => (
              <Bar
                key={key}
                stackId="current"
                dataKey={key}
                fill={period2Color[key]}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesBarChart
