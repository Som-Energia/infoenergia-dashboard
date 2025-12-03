import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

const StackedBarChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer height={400}>
        <BarChart
          data={[data.periods]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data.periods).map((element) => (
            <Bar
              key={element}
              dataKey={element}
              stackId="a"
              fill={data.fills[element]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChart
