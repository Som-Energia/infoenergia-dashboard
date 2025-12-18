import { useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import { CalendarIcon } from '@mui/x-date-pickers'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { periodUnit } from '../../services/utils'
import dayjs from 'dayjs'

const DAY = 'DAILY'
const MONTH = 'MONTHLY'
const YEAR = 'YEARLY'

function CustomDatePicker(props) {

  const {
    type = 'day',
    selectedDate,
    handleDateChange,
    prevNextButtons,
    minDate,
    maxDate,
    shouldDisableDate = () => { },
  } = props

  /**
    * Add N days, months or years to date
    * @param {number} count
    * @param {string} periodUnit
    */
  function add(count, periodUnit) {
    let newDate = dayjs(selectedDate).add(count, periodUnit)
    newDate = maxDate && newDate.isAfter(maxDate)
      ? maxDate
      : newDate
    handleDateChange(newDate)
  }

  /**
    * Subtract N days, months or years to date
    *
    * @param {number} count
    * @param {string} periodUnit
    */
  function subtract(count, periodUnit) {
    let newDate = dayjs(selectedDate).subtract(count, periodUnit)
    newDate = minDate && newDate.isBefore(minDate)
      ? minDate
      : newDate

    handleDateChange(newDate)
  }

  const getPickerConf = () => {
    if (type === 'month') {
      return {
        add: () => add(1, periodUnit(MONTH)),
        substract: () => subtract(1, periodUnit(MONTH)),
        view: ['month'],
        format: 'MM/YYYY',
        toolbarFormat: 'MMMM YYYY',
        id: 'month-picker',
      }
    }

    if (type === 'year') {
      return {
        add: () => add(1, periodUnit(YEAR)),
        substract: () => subtract(1, periodUnit(YEAR)),
        view: ['year'],
        format: 'YYYY',
        toolbarFormat: 'YYYY',
        id: 'year-picker',
      }
    }

    return {
      add: () => add(1, periodUnit(DAY)),
      substract: () => subtract(1, periodUnit(DAY)),
      view: ['day'],
      format: 'DD/MM/YYYY',
      toolbarFormat: 'dd., MMM D',
      id: 'day-picker',
    }
  }

  const picker = getPickerConf(type)
  const [isOpen, setOpen] = useState(false)

  return (
    <ControlsWrapper>
      <DateControlsWrapper>
        {
          prevNextButtons &&
          <IconButton
            disabled={minDate && dayjs(selectedDate).isSame(minDate, type)}
            onClick={() => picker.substract(1)} size="large">
            <ArrowBackIosOutlinedIcon fontSize="small" />
          </IconButton>
        }
        <DatePicker
          open={isOpen}
          slotProps={{
            textField: {
              id: picker.id,
              size: 'small',
              variant: 'outlined',
              style: { fontSize: '1rem' },
              onClick: () => setOpen(true)
            },
            toolbar: {
              toolbarFormat: picker.toolbarFormat,
              hidden: false
            },
          }}
          minDate={minDate}
          maxDate={maxDate}
          slots={{ openPickerIcon: () => <CalendarIcon onClick={() => setOpen(true)} /> }}
          views={picker.view}
          value={selectedDate}
          format={picker.format}
          shouldDisableDate={shouldDisableDate}
          dayOfWeekFormatter={(date) => date.format('dd')}
          onChange={(date, event) => handleDateChange(date, event)}
          onClose={() => setOpen(false)}
        />

        {
          prevNextButtons &&
          <IconButton
            disabled={maxDate && dayjs(selectedDate).isSame(maxDate, type)}
            onClick={() => picker.add(1)} size="large">
            <ArrowForwardIosOutlinedIcon fontSize="small" />
          </IconButton>
        }
      </DateControlsWrapper>
    </ControlsWrapper>
  )
}

export default CustomDatePicker

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`
const DateControlsWrapper = styled.div`
  padding-top: 0;
  display: flex;
  align-items: center;
`
