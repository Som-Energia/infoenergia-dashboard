import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function DistributionPieChart({ data, colors }) {
  const values = []
  for (const property in data) {
    if (colors[property] !== undefined) {
      values.push({ value: data[property], name: property })
    }
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={values}
            innerRadius={55}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {values.map((entry, index) => (
              <Cell key={index} fill={colors[entry?.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default DistributionPieChart
