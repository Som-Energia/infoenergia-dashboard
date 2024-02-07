import React, { useMemo, useState } from 'react'
import RightsManage from 'components/Generation/RightsManage'
import Grid from '@material-ui/core/Grid'
import Loading from 'components/Loading'
import { period2ColorKwhBag, generationKwhRecordData } from 'services/utils'
import CustomBarChart from 'components/Generation/CustomBarChart'
import { useTranslation } from 'react-i18next'


export default function Record({
  handleDateChange,
  selectedDate,
  viewTypeValue,
  loading,
  kWhRecord,
}) {
  const [periods, setPeriods] = useState('Taula_Peatges_20')
  const { t } = useTranslation()

  const handleChange = (event) => {
    setPeriods(event.target.value)
  }

  const groupedData = useMemo(() => {
    const formattedRecordData = generationKwhRecordData(
      kWhRecord,
      periods,
      t
    )
    return formattedRecordData
  }, [kWhRecord, periods])

  return (
    <>
      {loading ? (
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          id="record-loading-component"
        >
          <Loading />
        </Grid>
      ) : (
        <RightsManage
          handleDateChange={handleDateChange}
          viewTypeValue={viewTypeValue}
          selectedDate={selectedDate}
          total={groupedData?.total}
          handlePeriodChange={handleChange}
          periods={periods}
        >
          {/* MIRAR DE CONFIGURAR LES DADES DEL TIMECURVES */}
          <Grid
            id="record-chart-component"
            item
            style={{ padding: '30px 0 0 0' }}
          >
            <CustomBarChart
              data={groupedData}
              period={'YEARLY'}
              tariffTimetableId={periods}
              periodColor={period2ColorKwhBag}
              legend={true}
            />
          </Grid>
        </RightsManage>
      )}
    </>
  )
}
