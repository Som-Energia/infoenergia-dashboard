import React from 'react'
import Table from '../../components/Table'
import RightsManage from '../../components/Generation/RightsManage'
import Grid from '@mui/material/Grid'
import Loading from '../../components/Loading'

export default function Use({
  handleViewTypeChange,
  handleDateChange,
  selectedDate,
  viewTypeValue,
  assignmentsTableFormat,
  loading,
}) {


  return (
    <>
      {loading ? (
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
          total={assignmentsTableFormat.total}
          isLoading={loading}
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
