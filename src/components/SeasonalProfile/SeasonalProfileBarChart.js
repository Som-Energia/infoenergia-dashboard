import React, { PureComponent } from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList
} from 'recharts'

import { formatkWh, formatEuros } from '../../services/utils'

class CustomLabel extends PureComponent {
  render () {
    const { x, y, width, data, index } = this.props

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={width / 2} y={0} dy={-40} textAnchor="middle" fill="#96b633" fontWeight="700" fontSize="1.5rem">{formatEuros(data?.price[index].euros)}</text>
        <text x={width / 2} y={0} dy={-15} textAnchor="middle" fill="#666" fontWeight="700" fontSize="1.5rem">{formatkWh(data?.valueKwh[index].kWh)}</text>
      </g>
    )
  }
}

function SeasonalProfileBarChart ({ data }) {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data?.price}>
          <CartesianGrid stroke="#cccccc" strokeWidth={0.5} vertical={false} />
          <YAxis dataKey="euros" axisLine={false} tick={() => ''} width={0} domain={[dataMin => 0, dataMax => (dataMax * 1.1 + 50)]} tickCount={8} />
          <XAxis dataKey="season" tick={{ transform: 'translate(0, 8)' }} tickFormatter={ tickItem => tickItem.toUpperCase() } tickLine={false} fontWeight={500} fontSize="1.35rem" />
          <Bar dataKey="euros" fill="#96b633" >
            <LabelList content={<CustomLabel data={data} />} position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SeasonalProfileBarChart
