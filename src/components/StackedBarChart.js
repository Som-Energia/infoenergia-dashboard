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
import { period2Color } from '../services/utils'
import 'resize-observer-polyfill/dist/ResizeObserver.global'


const StackedBarChart = ({data}) => {
  return (
    <div>
      <ResponsiveContainer height={400}>
        <BarChart
          data={[data]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data).map((element) => <Bar key={element} dataKey={element} stackId="a" fill={period2Color[element]} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StackedBarChart
