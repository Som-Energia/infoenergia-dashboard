import React from 'react'
import styled from 'styled-components'
import * as dayjs from 'dayjs'

import { formatkWhDecimal } from '../../services/utils'

const MonthName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
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
  }
  ,
  &.high {
    background-color: #f2970f;
  }
`
const findConsumDay = (consums, day) => {
  return consums?.filter((item) => item.day === day)
}

const ConsumDay = (props) => {
  const { day, consum, levels } = props
  const [low, high] = levels
  const consumDay = consum?.[0]?.kWh || 0

  let className = ''
  if (consumDay < low?.kWh) {
    className = 'low'
  } else if (consumDay < high?.kWh) {
    className = 'normal'
  } else if (consumDay > high?.kWh) {
    className = 'high'
  } else {
    className = ''
  }

  return (
    <Day title={formatkWhDecimal(consumDay)} className={className}>
      {day}
    </Day>
  )
}

const CalendarMonth = (props) => {
  const { month, consum, levels } = props
  const currentMonth = `${month?.fullMonth}`.slice(-2)
  const currentYear = `${month?.fullMonth}`.slice(0, 4)
  const fullMonth = month?.fullMonth
    ? dayjs(`${currentMonth} ${currentYear}`, 'MM YYYY', true).format('MMMM')
    : ''

  return (
    <>
      <MonthName>{fullMonth}</MonthName>
      <Calendar>
        {month?.arrayDays.map((week, weekIdx) =>
          week.map((day, dayIdx) => {
            const formatedDay = ('0' + day).slice(-2)
            const fullMonth = month?.fullMonth
            const dayMonth = fullMonth + formatedDay
            const consumDay = findConsumDay(consum, dayMonth)
            if (day === 0) {
              return <EmptyDay key={weekIdx + '-' + dayIdx} />
            }

            return (
              <ConsumDay
                key={weekIdx + '-' + dayIdx}
                day={day}
                consum={consumDay}
                levels={levels}
              />
            )
          })
        )}
      </Calendar>
    </>
  )
}

export default CalendarMonth
