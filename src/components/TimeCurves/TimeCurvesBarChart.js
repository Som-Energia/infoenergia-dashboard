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

function TimeCurvesBarChart ({ data, period }) {
  const formatXAxis = (tickItem) => {
    switch (period) {
      case 'DAILY':
        return moment(tickItem).format('HH') + 'h'
        break
      case 'WEEKLY':
        return moment(tickItem).format('dddd')
        break
      case 'MONTHLY':
        return moment(tickItem).format('D')
        break
      default:
        return moment(tickItem).format('MMMM')
        break
    }
  }

  const formatTooltipLabel = (value) => {
    return moment(value).format('DD/MM/YYYY HH') + 'h'
  }

  const formatTooltip = (value, name, props) => (['kWh', value / 1000])

  const groupWeeklyData = (data) => {
    const weekly = []
    for (let day = 1; day <= 7; day++) {
      const days = data.filter(item => moment(item?.date).isoWeekday() === day)
      const totalValue = days.reduce((prev, current) => prev + current?.value, 0)
      weekly.push({ date: days[0]?.date, value: totalValue })
    }
    return weekly
  }

  const groupDataByPeriod = (data, period) => {
    console.log(period)
    if (period === 'WEEKLY') {
      return groupWeeklyData(data)
    } else {
      return data
    }
  }

  const groupedData = groupDataByPeriod(data, period)

  return (
    <div style={{ height: '450px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={groupedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatXAxis} tick={{ fontSize: 12, transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={10} tick={{ fontSize: 12 }} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={formatTooltipLabel} />
          <Bar dataKey="value" barSize={24} fill="#96b633" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeCurvesBarChart
