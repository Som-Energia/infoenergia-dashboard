import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles
import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  picker: {
    border: '1px solid #bdbcbc',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    height: '24px',
    padding: '5px',
  },
}))

function MonthPicker({ add, substract, selectedDate, handleDateChange }) {
  const classes = useStyles()

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
        className={classes.picker} // Apply your custom styles
      />
      <IconButton onClick={() => add(1)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}

export default MonthPicker
