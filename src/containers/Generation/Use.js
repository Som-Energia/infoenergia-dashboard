import React, { useContext } from 'react'
import Table from '../../components/Table'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import RightsManage from 'components/Generation/RightsManage'
import Grid from '@material-ui/core/Grid'
import Loading from 'components/Loading'

export default function Use({ handleViewTypeChange, handleDateChange }) {
  const { selectedDate, viewTypeValue, assignmentsTableFormat, loadingUse } =
    useContext(GenerationUseContext)
  return (
    <>
      {loadingUse ? (
        <Grid
          id="loading-use-id"
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
          isLoading={loadingUse}
        >
          <Table
            columns={assignmentsTableFormat.columns}
            rows={assignmentsTableFormat?.rows}
            id={'table-body-assignment-consumption'}
          />
        </RightsManage>
      )}
    </>
  )
}
