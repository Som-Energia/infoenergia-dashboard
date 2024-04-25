import React, { useMemo } from 'react'
import styled from 'styled-components'

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from 'recharts'

import {
  formatXAxis,
  formatTooltipLabel,
  formatTooltip,
  mergeData,
  groupDataByPeriod,
  ticksFromData,
  domainFromData,
  formatDecimal,
} from 'services/utils'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

function TimeCurvesLineChart({ period, data = [], compareData = [] }) {
  const mixedData = useMemo(() => {
    const groupedData = groupDataByPeriod(data, period, 'lineChart')
    const groupedComparedData = groupDataByPeriod(compareData, period, 'lineChart')
    return mergeData(groupedData, groupedComparedData)
  }, [data, period, compareData])

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={mixedData}>
          <CartesianGrid stroke="#ccc" strokeWidth={0.5} vertical={false} />
          <XAxis
            dataKey="date"
            type="number"
            ticks={ticksFromData(mixedData, period)}
            scale="time"
            domain={domainFromData(mixedData, period)}
            tickFormatter={(tickItem) => formatXAxis(period, tickItem)}
            padding={{ left: 24, right: 24 }}
            tick={{ fontSize: '1rem', transform: 'translate(0, 8)' }}
          />
          <YAxis
            type="number"
            domain={[0, 'auto']}
            axisLine={false}
            tickCount={7}
            tickLine={false}
            tickFormatter={(tickItem) => `${formatDecimal(tickItem)}`}
            tick={{ fontSize: '1rem', transform: 'translate(0, 0)' }}
          >
            <Label
              value="kWh"
              angle={-90}
              position="insideLeft"
              fill="#969696"
            />
          </YAxis>
          <Tooltip
            formatter={(value) => formatTooltip(value, 'kWh', 3)}
            labelFormatter={(value) =>
              formatTooltipLabel(period, value, 'lineChart')
            }
            contentStyle={{ fontWeight: 'bold' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#96b633"
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          {compareData && (
            <Line
              type="monotone"
              dataKey="compValue"
              stroke="#f2970f"
              dot={false}
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default React.memo(TimeCurvesLineChart)
