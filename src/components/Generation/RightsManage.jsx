import React, { useEffect } from 'react'
import { Grid, FormControl, Select } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Loading } from '@somenergia/somenergia-ui'
import PeriodSelector from './PeriodSelector'
import { useParams } from 'react-router-dom'
import { ConsumptionDisplay, SomDatePicker } from '@somenergia/somenergia-ui'

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
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}
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
              <ConsumptionDisplay
                period={viewTypeValue}
                currentDate={selectedDate}
                totalKwh={total}
              />
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
                <SomDatePicker
                  period={viewTypeValue}
                  currentTime={selectedDate}
                  setCurrentTime={handleDateChange}
                  sx={{
                    borderColor: 'secondary.main',
                    input: {
                      textAlign: 'center',
                    },
                  }}
                />
              </Grid>
              {handleViewTypeChange ? (
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth variant='standard'>
                    <Select
                      native
                      value={viewTypeValue}
                      onChange={handleViewTypeChange}
                      inputProps={{
                        name: 'viewType',
                        id: 'type-view-select',
                      }}
                    >
                      <option id="month-option" value={'MONTHLY'}>
                        {t('GENERATION_KWH_SELECT_MONTH')}
                      </option>
                      <option id="year-option" value={'YEARLY'}>
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
