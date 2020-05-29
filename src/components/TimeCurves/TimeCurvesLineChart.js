import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

const formatXAxis = (tickItem) => {
  return moment(tickItem).format('HH') + 'h'
}

const formatTooltipLabel = (value) => {
  return moment(value).format('DD/MM/YYYY HH') + 'h'
}

const formatTooltip = (value) => {
  return [`${value / 1000} kWh`, null]
}

const mergeData = (arrData1 = [], arrData2 = []) => {
  if (arrData1 > arrData2) {
    return arrData1.map((item, index) => (
      {
        date: item.date,
        value: item.value,
        compValue: arrData2[index]?.value
      }
    ))
  } else {
    return arrData2.map((item, index) => (
      {
        date: item.date,
        value: arrData1[index]?.value,
        compValue: item.value
      }
    ))
  }
}

function TimeCurvesLineChart ({ data = [], compareData = [] }) {
  const [mixedData, setMixedData] = useState([])

  useEffect(() => {
    if (compareData.length) {
      const mixedDataArr = mergeData(data, compareData)
      setMixedData(mixedDataArr)
    } else {
      setMixedData(data)
    }
  }, [data, compareData])

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={mixedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatXAxis} padding={{ left: 24, right: 24 }} tick={{ fontSize: 13, transform: 'translate(0, 8)' }} />
          <YAxis type="number" domain={[0, 'auto']} axisLine={false} tickCount={8} width={75} tick={{ fontSize: 13 }} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={formatTooltipLabel} contentStyle={{ fontWeight: 'bold' }} />
          <Line type="monotone" dataKey="value" stroke="#96b633" dot={false} strokeWidth={3} />
          { compareData &&
            <Line type="monotone" dataKey="compValue" stroke="#f2970f" dot={false} strokeWidth={3} />
          }
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default React.memo(TimeCurvesLineChart)
