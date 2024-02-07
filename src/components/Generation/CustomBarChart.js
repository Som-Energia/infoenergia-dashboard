import React from 'react'

import {
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  Legend,
  BarChart,
} from 'recharts'

import { formatTooltipLabel, formatXAxis } from 'services/utils'

function CustomBarChart({ data, period, legend = false }) {

  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data.periods}>
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
            labelFormatter={(value) => formatTooltipLabel(period, value)}
            cursor={{ fill: '#f2f2f2bb' }}
            contentStyle={{ fontWeight: 'bold' }}
          />
          {legend && <Legend />}
          {data.keys.map((element) => {
            return (
              <Bar
                key={element}
                stackId="current"
                dataKey={element}
                fill={data.fills[element]}
              />
            )
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart