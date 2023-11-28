import React, { useContext } from 'react'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import RightsManage from 'components/Generation/RightsManage'
import Grid from '@material-ui/core/Grid'
import Loading from 'components/Loading'
import mockCurves from '../Generation/mockData/Remaining'
import TimeCurvesBarChart from 'components/TimeCurves/TimeCurvesBarChart'

export default function Record() {
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
        <RightsManage
          handleViewTypeChange={handleViewTypeChange}
          handleDateChange={handleDateChange}
          viewTypeValue={viewTypeValue}
          selectedDate={selectedDate}
          assignmentsTableFormat={assignmentsTableFormat}
        >
          {/* MIRAR DE CONFIGURAR LES DADES DEL TIMECURVES */}
          <Grid item style={{padding:"30px 0 0 0"}}>
            <TimeCurvesBarChart
              data={mockCurves}
              period={'MONTHLY'}
              tariffTimetableId={'Taula_Peatges_20'}
            />
          </Grid>
        </RightsManage>
      )}
    </>
  )
}

