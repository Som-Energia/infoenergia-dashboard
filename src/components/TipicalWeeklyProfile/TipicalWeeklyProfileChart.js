import React from 'react'
import { useTranslation } from 'react-i18next'

import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { formatkWhDecimal, formatPerc, formatDecimal, formatDay, formatDayHour } from '../../services/utils'

const CustomizedDaysValuesTick = (props) => {
  const { x, y, data } = props
  const { t } = useTranslation()

  const avgDataDay = (day) => {
    const avgData = data
    for (const item in avgData) {
      if (avgData[item].weekDay === parseInt(day)) {
        return avgData[item]
      }
    }
  }

  const [currentDay] = props.payload.value.split('-')
  const avgDay = avgDataDay(currentDay)

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={1} dy={16} textAnchor="middle" fill="#666" fontWeight="500" fontSize="1.5rem">
        {formatDay(parseInt(avgDay?.weekDay) + 1)}
      </text>
      <text x={0} y={20} dy={16} textAnchor="middle" fill="#666">
        {t('AVG_USE')}
      </text>
      <text x={0} y={45} dy={16} textAnchor="middle" fill="#96b633" fontWeight="600" fontSize="1.5rem">
        {formatkWhDecimal(avgDay?.avgKWh, 10)}
      </text>
      <text x={0} y={70} dy={16} textAnchor="middle" fill="#666" fontWeight="500" fontSize="1.5rem">
        {formatPerc(avgDay?.avgPercentage)}
      </text>
    </g>
  )
}

const formatTooltip = (value, name) => {
  return [name, formatDecimal(value, 1000)]
}

const formatLabel = (value) => {
  const [day, hour] = value.split('-')
  return `${formatDayHour(day, hour)}h`
}

const TipicalWeeklyProfileChart = ({ data }) => {
  const { avgWeekCCH, formatAvgWeekCCH } = data
  const tickPoints = [...Array(7).keys()].map(index => index + '-12')

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height={300}>
        {
          formatAvgWeekCCH
            ? <LineChart data={formatAvgWeekCCH}
              margin={{ top: 10, bottom: 10 }}>
              <CartesianGrid stroke="#a1a1a1" vertical={false} />
              <XAxis height={100} ticks={tickPoints} dataKey="dayHour" tick={<CustomizedDaysValuesTick data={avgWeekCCH} />} />
              <YAxis axisLine={false} tick={() => ''} width={0} />
              <Tooltip cursor={{fill: '#f2f2f2'}} formatter={formatTooltip} labelFormatter={formatLabel} separator=" " />
              <Line type="monotone" dataKey="kWh" stroke="#96b633" dot={false} strokeWidth={4} />
            </LineChart>
            : <></>
        }
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalWeeklyProfileChart
