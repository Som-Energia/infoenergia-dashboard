import React from 'react'

import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'

const zeroPad = (num, places) => String(num).padStart(places, '0')

const formatXAxis = (tickItem) => {
  return zeroPad(tickItem, 2) + 'h'
}

const TipicalDailyProfileChart = ({ data }) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#a1a1a1" vertical={false} />
          <XAxis dataKey="hour" tickFormatter={formatXAxis} tick={{ transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={6} tickLine={false} tickFormatter={(tickItem) => `${tickItem} kWh`} tick={{ transform: 'translate(-2, 0)' }} />
          <Tooltip />
          {
            data !== undefined
              ? <Bar dataKey="kWh">
                { data.map((entry, index) =>
                  <Cell key={index} fill={
                    entry?.hour > 11 && entry?.hour < 23
                      ? '#f2970f'
                      : '#96b633'
                  } />)
                }
              </Bar>
              : ''
          }
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
