import React from 'react'

import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  Label,
} from 'recharts'
import { SummaryPeriodChart } from '@somenergia/somenergia-ui'

import { colorPeriod, formatDecimal, formatNumber } from '../../services/utils'

const zeroPad = (num, places) => String(num).padStart(places, '0')

const formatXAxis = (tickItem) => {
  return zeroPad(tickItem, 2) + 'h'
}

const formatTooltip = (value, name) => {
  return [name, formatDecimal(value, 1000)]
}

const formatLabel = (value) => {
  return formatXAxis(value)
}

const colorPeriods = (hour, isWeekend) => {
  if (isWeekend || (hour >= 0 && hour < 8)) return 'low'

  return (hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)
    ? 'average'
    : 'up'
}

function transformBardata(data) {
  // build the periods array of dicts
  let periods = []
  data.forEach((item) => {
    const colorItem = colorPeriods(item.hour, false)
    item[colorItem] = item.kWh
    console.log('colorItem', item)
    periods.push(item)
  })
  // TODO: check where to define these colors
  return {
    fills: {
      low: '#c4dd8c',
      average: '#f2970f',
      up: '#96b633',
    },
    keys: ['low', 'average', 'up'],
    periods: periods,
  }
}

const TipicalDailyProfileChart = ({ period, data = [], lang = 'es' }) => {
  const bardata = transformBardata(data)

  console.log('bardata', bardata)
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer>
          <SummaryPeriodChart
            data={bardata}
            period="DAILY"
            Ylegend={'€/kWh'}
            legend={true}
            showTooltipKeys={false}
            //referenceLineData={referenceLineData}
            //tickCount={tickCountValue}
            //maxYAxisValue={computeMaxYAxisValue(totalPrices, tickCountValue)}
            //minYAxisValue={computeMinYAxisValue(totalPrices, tickCountValue)}
          />
        {/* <BarChart width={730} height={250} data={data}>
          <CartesianGrid stroke="#cccccc" vertical={false} />
          <XAxis
            dataKey="hour"
            tickFormatter={formatXAxis}
            tick={{ transform: 'translate(0, 8)' }}
          />
          <YAxis
            axisLine={false}
            tickCount={6}
            tickLine={false}
            tickFormatter={(tickItem) => `${formatNumber(tickItem)}`}
            tick={{ transform: 'translate(-2, 0)' }}
          >
            <Label
              value="kWh"
              angle={-90}
              position="insideLeft"
              fill="#969696"
            />
          </YAxis>
          <Tooltip
            cursor={{ fill: '#f2f2f2' }}
            formatter={formatTooltip}
            labelFormatter={formatLabel}
            separator=" "
          />
          {data !== undefined ? (
            <Bar dataKey="kWh">
              {data.map((entry, index) => (
                <Cell key={index} fill={colorPeriod(entry?.hour)} />
              ))}
            </Bar>
          ) : (
            ''
          )}
        </BarChart> */}
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalDailyProfileChart
