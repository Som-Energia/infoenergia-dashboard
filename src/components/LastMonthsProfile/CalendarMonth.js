import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const MonthName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background-color: #f2f2f2;
  color: #585857;
  font-weight: 500;
  padding: 8px 0;
`

const Calendar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
  margin-top: 8px;
`

const EmptyDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #ffffff;
  padding: 6px 0;
  font-size: 1.85rem;
  font-weight: 500;
`

const Day = styled(EmptyDay)`
  background-color: #616161;
  &.normal {
    background-color: #96b633;
  }
`

const CalendarMonth = (props) => {
  const { month, consum } = props
  return (
    <>
      <MonthName>{ moment(month?.fullMonth, 'YYYYMM').format('MMMM')}</MonthName>
      <Calendar>
        {
          month?.arrayDays.map((week, weekIdx) => (
            week.map((day, dayIdx) => (
              day === 0
                ? <EmptyDay key={weekIdx + '-' + dayIdx} />
                : <Day className="normal" key={weekIdx + '-' + dayIdx}>{ day }</Day>
            ))
          ))
        }
      </Calendar>
    </>
  )
}

export default CalendarMonth
