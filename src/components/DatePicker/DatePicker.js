import React from 'react'
import MonthPicker from './MonthPicker'
import YearPicker from './YearPicker'

function DatePicker({ type, selectedDate, handleDateChange }) {

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
        />
      ) : (
        <YearPicker
          add={addYears}
          substract={subtractYears}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      )}
    </>
  )
}

export default DatePicker
