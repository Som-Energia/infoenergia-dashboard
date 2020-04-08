import React from 'react'

import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'

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
          <XAxis dataKey="hour" tickFormatter={formatXAxis} />
          <YAxis axisLine={false} tickFormatter={(tickItem) => `${tickItem} kWh`} />
          <Tooltip />
          <Bar dataKey="kWh" fill="#96b633" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
