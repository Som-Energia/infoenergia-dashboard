import React, { useContext, useEffect } from 'react'
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
import PeriodSelector from './PeriodSelector'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

export default function RightsManage({
  children,
  handleDateChange,
  handleViewTypeChange,
  handlePeriodChange,
  periods,
  isLoading,
  selectedDate,
  viewTypeValue,
  total,
}) {
  
  const { t } = useTranslation()
  const { MONTH } = useContext(GenerationUseContext)

  const { language } = useParams()
  const { i18n } = useTranslation()
  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')

  }, [language, i18n])

  return (
    <>
      {isLoading ? (
        <Grid
          id="loading-comp-id"
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
                <strong>{total}</strong> kWh
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
                      viewTypeValue === MONTH
                        ? t(getMonthCode(dayjs(selectedDate).month() + 1))
                        : t('YEARLY'),
                  })}
                </Typography>
                <Typography style={{ color: '#96B633' }}>
                  {dayjs(selectedDate).year()}
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
              <Grid item xs={12} sm={3}>
                <DatePicker
                  selectedDate={dayjs(selectedDate)}
                  handleDateChange={handleDateChange}
                  type={viewTypeValue}
                />
              </Grid>
              {handleViewTypeChange ? (
                <Grid item xs={12} sm={3}>
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
                      <option id="month-option" value={'month'}>
                        {t('GENERATION_KWH_SELECT_MONTH')}
                      </option>
                      <option id="year-option" value={'year'}>
                        {t('GENERATION_KWH_SELECT_YEAR')}
                      </option>
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
              {handlePeriodChange ? (
                <Grid item xs={12} sm={2}>
                  <PeriodSelector
                    handleChange={handlePeriodChange}
                    periods={periods}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>

          {children}
        </>
      )}
    </>
  )
}
