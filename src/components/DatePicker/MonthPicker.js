import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles
import { Box, IconButton } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import './DatePickerStyles.css'

function MonthPicker({ add, substract, selectedDate, handleDateChange }) {

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3px',
      }}
    >
      <IconButton onClick={() => substract(1)}>
        <ArrowBackIosIcon />
      </IconButton>
      <DatePicker
        selected={selectedDate}
        onChange={(date, event) => handleDateChange(date, event)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        id='month-picker'
      />
      <IconButton onClick={() => add(1)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}

export default MonthPicker
