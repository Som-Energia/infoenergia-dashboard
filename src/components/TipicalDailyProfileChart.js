import React from 'react'

import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'

function TipicalDailyProfileChart ({ data }) {
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  const formatXAxis = (tickItem) => {
    return zeroPad(tickItem, 2) + 'h'
  }

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#616161" vertical={false} />
          <XAxis dataKey="hour" tickFormatter={formatXAxis} tick={{ transform: 'translate(0, 8)' }} />
          <YAxis axisLine={false} tickCount={6} tickFormatter={(tickItem) => `${tickItem} kWh`} tick={{ transform: 'translate(-4, 0)' }} />
          <Tooltip />
          <Bar dataKey="kWh">
            { data.map((entry, index) =>
              <Cell key={index} fill={
                entry?.hour > 11 && entry?.hour < 23
                  ? '#f2970f'
                  : '#96b633'
              } />)
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
