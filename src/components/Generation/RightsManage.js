import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import DatePicker from 'components/DatePicker/DatePicker'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import { getMonthCode } from 'services/timecurves'
import Loading from 'components/Loading'

const viewTypes = ['month', 'year']

export default function Use({ children }) {
  const { t } = useTranslation()
  const {
    selectedDate,
    viewTypeValue,
    setSelectedDate,
    setViewTypeValue,
    assignmentsTableFormat,
    loadingUse,
  } = useContext(GenerationUseContext)

  const handleDateChange = (date, event) => {
    if (event) {
      event.preventDefault()
    }
    setSelectedDate(date)
  }

  const handleViewTypeChange = (event) => {
    setViewTypeValue(event.target.value)
  }

  return (
    <>
      {loadingUse ? (
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading />
        </Grid>
      ) : (
        <>
          <Grid
            container
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                style={{ color: '#96B633' }}
              >
                {assignmentsTableFormat.total + ' kWh'}
              </Typography>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography style={{ fontWeight: 'bold' }}>
                  {t('GENERATION_KWH_USE_TOTAL', {
                    month:
                      viewTypes[viewTypeValue] === 'month'
                        ? t(getMonthCode(selectedDate.getMonth() + 1))
                        : t('YEARLY'),
                  })}
                </Typography>
                <Typography style={{ color: '#96B633' }}>
                  {selectedDate.getFullYear()}
                </Typography>
              </Box>
            </Grid>

            <Grid
              container
              item
              xs={12}
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
              }}
              spacing={1}
            >
              <Grid item xs={12} sm={2}>
                <DatePicker
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                  type={viewTypes[viewTypeValue]}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <Select
                    native
                    value={viewTypeValue}
                    onChange={handleViewTypeChange}
                    inputProps={{
                      name: 'viewType',
                      id: 'type-view-select',
                    }}
                  >
                    <option id="month-option" value={0}>
                      {t('GENERATION_KWH_SELECT_MONTH')}
                    </option>
                    <option id="year-option" value={1}>
                      {t('GENERATION_KWH_SELECT_YEAR')}
                    </option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {children}
        </>
      )}
    </>
  )
}
