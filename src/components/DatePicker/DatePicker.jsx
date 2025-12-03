import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined'
import { DatePicker } from '@material-ui/pickers'
import { periodUnit } from '../../services/utils'
import dayjs from 'dayjs'

const MONTH = 'MONTHLY'
const YEAR = 'YEARLY'

function CustomDatePicker({ type, selectedDate, handleDateChange }) {
  function addMonths(){
    const newDate = dayjs(selectedDate).add(1, periodUnit(MONTH))
    handleDateChange(newDate)
  }
  function subtractMonths() {
    const newDate = dayjs(selectedDate).subtract(1, periodUnit(MONTH))
    handleDateChange(newDate)
  }

  function addYears() {
    const newDate = dayjs(selectedDate).add(1, periodUnit(YEAR))
    handleDateChange(newDate)
  }

  function subtractYears() {
    const newDate = dayjs(selectedDate).subtract(1, periodUnit(YEAR))
    handleDateChange(newDate)
  }

  const getPickerConf = () => {
    if (type === 'month') {
      return {
        add: addMonths,
        substract: subtractMonths,
        view: ['month'],
        format: 'MM/YYYY',
        id: 'month-picker',
      }
    } else {
      return {
        add: addYears,
        substract: subtractYears,
        view: ['year'],
        format: 'YYYY',
        id: 'year-picker',
      }
    }
  }

  const picker = getPickerConf(type)

  return (
    <ControlsWrapper>
      <DateControlsWrapper>
        <IconButton onClick={() => picker.substract(1)}>
          <ArrowBackIosOutlinedIcon fontSize="small" />
        </IconButton>
        <DatePicker
          id={picker.id}
          views={picker.view}
          value={selectedDate}
          variant="inline"
          autoOk
          size="small"
          inputVariant="outlined"
          onChange={(date, event) => handleDateChange(date, event)}
          format={picker.format}
          InputProps={{
            style: { fontSize: '1rem' },
            startAdornment: (
              <IconButton edge="start" size="small">
                <TodayOutlinedIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <IconButton onClick={() => picker.add(1)}>
          <ArrowForwardIosOutlinedIcon fontSize="small" />
        </IconButton>
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

export const Widget = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 16px 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 16px;
  }
  background-color: #fff;
  border-radius: 0;
`
