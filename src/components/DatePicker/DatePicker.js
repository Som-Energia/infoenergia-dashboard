import React from 'react'
import MonthPicker from './MonthPicker'
import YearPicker from './YearPicker'
import { useParams } from 'react-router-dom'
import ca from 'date-fns/locale/ca'
import es from 'date-fns/locale/es'
import {registerLocale} from 'react-datepicker'

registerLocale('ca',ca)
registerLocale('es',es)

function DatePicker({ type, selectedDate, handleDateChange }) {

  const { language } = useParams()
  const addMonths = (months) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + months)
    handleDateChange(newDate)
  }
  function subtractMonths(months) {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() - months)
    handleDateChange(newDate)
  }

  function addYears(years) {
    const newDate = new Date(selectedDate)
    newDate.setFullYear(newDate.getFullYear() + years)
    handleDateChange(newDate)
  }

  function subtractYears(years) {
    const newDate = new Date(selectedDate)
    newDate.setFullYear(newDate.getFullYear() - years)
    handleDateChange(newDate)
  }

  return (
    <>
      {type === 'month' ? (
        <MonthPicker
          add={addMonths}
          substract={subtractMonths}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          lang={language}
        />
      ) : (
        <YearPicker
          add={addYears}
          substract={subtractYears}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          lang={language}
        />
      )}
    </>
  )
}

export default DatePicker
