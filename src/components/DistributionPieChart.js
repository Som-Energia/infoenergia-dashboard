import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function DistributionPieChart ({ data, colors }) {
  const values = []
  for (const property in data) {
    values.push({ value: data[property], name: property })
  }

  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={values}
            cx={120}
            cy={130}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {values.map((entry, index) => <Cell key={index} fill={colors[entry?.name]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

export default DistributionPieChart
