import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { formatkWhDecimal } from '../../services/utils'

const MonthName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: #f2f2f2;
  color: #585857;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 8px 0;
`

const Calendar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
  margin-top: 12px;
`

const EmptyDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #ffffff;
  padding: 6px 0;
  font-size: 1.25rem;
  font-weight: 500;
`

const Day = styled(EmptyDay)`
  background-color: #616161;
  &.low {
    background-color: #616161;
  }
  &.normal {
    background-color: #96b633;
  },
  &.hight {
    background-color: #f2970f;
  }
`
const findConsumDay = (consums, day) => {
  return consums.filter(item => item.day === day)
}

const ConsumDay = (props) => {
  const { day, consum, levels } = props
  const consumDay = consum[0]?.kWh
  let className = ''

  if (consumDay < levels[0]?.kWh) {
    className = 'low'
  } else if (consumDay < levels[1]?.kWh) {
    className = 'normal'
  } else {
    className = 'hight'
  }

  return <Day title={formatkWhDecimal(consumDay)} className={className}>{day}</Day>
}

const CalendarMonth = (props) => {
  const { month, consum, levels } = props
  return (
    <>
      <MonthName>{ moment(month?.fullMonth, 'YYYYMM').format('MMMM')}</MonthName>
      <Calendar>
        {
          month?.arrayDays.map((week, weekIdx) => (
            week.map((day, dayIdx) => {
              const formatedDay = ('0' + day).slice(-2)
              const dayMonth = `${month?.fullMonth}${formatedDay}`
              const consumDay = findConsumDay(consum, dayMonth)
              return day === 0
                ? <EmptyDay key={weekIdx + '-' + dayIdx} />
                : <ConsumDay key={weekIdx + '-' + dayIdx} day={day} consum={consumDay} levels={levels}/>
            })
          ))
        }
      </Calendar>
    </>
  )
}

export default CalendarMonth
