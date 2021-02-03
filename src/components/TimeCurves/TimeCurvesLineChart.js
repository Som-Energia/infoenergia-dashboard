import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { formatXAxis, formatTooltipLabel, formatTooltip, mergeData, groupDataByPeriod, tickCount } from '../../services/utils'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

function TimeCurvesLineChart ({ period, data = [], compareData = [] }) {
  const [mixedData, setMixedData] = useState([])
  const [tickNumber, setTickNumber] = useState(1)

  useEffect(() => {
    const groupedData = groupDataByPeriod(data, period, 'lineChart')
    setTickNumber(tickCount(period))
    if (compareData.length) {
      const mixedDataArr = mergeData(groupedData, compareData)
      setMixedData(mixedDataArr)
    } else {
      setMixedData(groupedData)
    }
  }, [data, compareData, period])

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={mixedData}>
          <CartesianGrid stroke="#616161" strokeWidth={0.5} vertical={false} />
          <XAxis dataKey="date" type="number" tickCount={tickNumber} domain={['dataMin', 'dataMax']} tickFormatter={ (tickItem) => formatXAxis(period, tickItem)} allowDuplicatedCategory={false} padding={{ left: 24, right: 24 }} tick={{ fontSize: 13, transform: 'translate(0, 8)' }} />
          <YAxis type="number" domain={[0, 'auto']} axisLine={false} tickCount={8} width={75} tick={{ fontSize: 13 }} tickFormatter={(tickItem) => `${(tickItem / 1000).toFixed(2)} kWh`} tickLine={false} />
          <Tooltip formatter={formatTooltip} labelFormatter={(value) => formatTooltipLabel(period, value, 'lineChart')} contentStyle={{ fontWeight: 'bold' }} />
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
