import React, { PureComponent } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { formatkWh, formatPerc } from '../../services/utils'

class CustomizedDaysValuesTick extends PureComponent {
  render () {
    const { x, y, data } = this.props
    const avgDataDay = (day) => {
      const avgData = data
      for (const item in avgData) {
        if (avgData[item].weekDay === parseInt(day)) {
          return avgData[item]
        }
      }
    }

    const currentDay = this.props.payload.value.split('-')[0]
    const days = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge']

    const avgDay = avgDataDay(currentDay)
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontWeight="700" fontSize="1.5rem">{days[currentDay]}</text>
        <text x={0} y={20} dy={16} textAnchor="middle" fill="#666">Mitjana d'ús</text>
        <text x={0} y={50} dy={16} textAnchor="middle" fill="#96b633" fontWeight="700" fontSize="1.75rem">{formatkWh(avgDay?.avgKWh)}</text>
        <text x={0} y={75} dy={16} textAnchor="middle" fill="#666" fontWeight="700" fontSize="1.75rem">{formatPerc(avgDay?.avgPercentage)}</text>
      </g>
    )
  }
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
              <CartesianGrid stroke="#cccccc" vertical={false}/>
              <XAxis height={100} ticks={tickPoints} dataKey="dayHour" tick={<CustomizedDaysValuesTick data={avgWeekCCH} />} />
              <YAxis axisLine={false} tick={() => ''} width={0} />
              <Tooltip />
              <Line type="monotone" dataKey="kWh" stroke="#96b633" dot={false} strokeWidth={4} />
            </LineChart>
            : <></>
        }
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalWeeklyProfileChart
