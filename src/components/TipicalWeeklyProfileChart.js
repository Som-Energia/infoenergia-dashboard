import React, { PureComponent } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts'

class CustomizedDaysValuesTick extends PureComponent {
  render () {
    const { x, y, data } = this.props

    const formatkWh = (item) => {
      return Math.round(item) + ' kWh'
    }

    const formatPerc = (item) => {
      return Math.round(item) + '%'
    }

    const avgDataDay = (day) => {
      const avgData = data.avgWeekCCH
      console.log(avgData)
      for (const item in avgData) {
        if (avgData[item].weekDay === day) {
          return avgData[item]
        }
      }
    }

    const currentDay = this.props.payload.value.split('-')[0]
    const currentHour = this.props.payload.value.split('-')[1]
    const days = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge']

    if (currentHour === '12') {
      const avgDay = avgDataDay(currentDay)

      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontWeight="800" fontSize="2rem">{days[currentDay]}</text>
          <text x={0} y={20} dy={16} textAnchor="middle" fill="#666">Mitjana d'ús</text>
          <text x={0} y={50} dy={16} textAnchor="middle" fill="#96b633" fontWeight="800" fontSize="2.5rem">{formatkWh(avgDay?.avgKWh)}</text>
          <text x={0} y={80} dy={16} textAnchor="middle" fill="#666" fontWeight="800" fontSize="2.5rem">{formatPerc(avgDay?.avgPercent)}</text>
        </g>
      )
    } else return null
  }
}

function TipicalWeeklyProfileChart ({ data }) {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.format_avgWeekCCH}
          margin={{ top: 10, bottom: 10 }}>
          <CartesianGrid stroke="#a1a1a1" vertical={false} />
          <XAxis height={100} dataKey="dayhour" tick={<CustomizedDaysValuesTick data={data} />} />
          <YAxis axisLine={false} tick={() => ''} />
          <Tooltip />
          <Line type="monotone" dataKey="kWh" stroke="#96b633" dot={false} strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TipicalWeeklyProfileChart
