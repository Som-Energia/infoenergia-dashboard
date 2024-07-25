import React, { useMemo } from 'react'
import Table from '../../components/Table'
import RightsManage from 'components/Generation/RightsManage'
import Grid from '@material-ui/core/Grid'
import Loading from 'components/Loading'
import { useTranslation } from 'react-i18next'
import { formatOrdinals } from '../../services/utils'
import { useParams } from 'react-router-dom'

export default function Use({
  handleViewTypeChange,
  handleDateChange,
  selectedDate,
  viewTypeValue,
  assignmentsTableFormat,
  loading,
}) {

  const { t } = useTranslation()
  const { language } = useParams()

  const getPriority = (priorityNumber) => {
    return priorityNumber === 0
      ? t('GENERATION_MAIN_PRIORITY')
      : formatOrdinals(language, priorityNumber + 1)
  }

  const columns3 = [
    t('GENERATION_KWH_USE_TABLE_CONTRACT_ADDRESS'),
    t('GENERATION_KWH_USE_TABLE_PRIORITY'),
    t('GENERATION_KWH_USE_TABLE_VALLEY'),
    t('GENERATION_KWH_USE_TABLE_FLAT'),
    t('GENERATION_KWH_USE_TABLE_PICK'),
    t('GENERATION_KWH_USE_TABLE_TOTAL'),
  ]

  const columns6 = [
    t('GENERATION_KWH_USE_TABLE_CONTRACT_ADDRESS'),
    t('GENERATION_KWH_USE_TABLE_PRIORITY'),
    'P6',
    'P5',
    'P4',
    'P3',
    'P2',
    'P1',
    t('GENERATION_KWH_USE_TABLE_TOTAL'),
  ]


  const tableData = useMemo(
    () => {
      const assignmentsTableFormatTmp = JSON.parse(JSON.stringify(assignmentsTableFormat))
      const maxLength = assignmentsTableFormatTmp?.dataKeys?.length
      assignmentsTableFormatTmp.columns = maxLength === 3 ? columns3 : columns6
      assignmentsTableFormatTmp.rows.forEach(row => {row.priority = row.priority !== '-' ? getPriority(row.priority) : '-' })
      return assignmentsTableFormatTmp
    },
    [assignmentsTableFormat]
  )

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
          total={tableData.total}
          isLoading={loading}
        >
          <Table
            columns={tableData.columns}
            rows={tableData?.rows}
            id={'table-body-assignment-consumption'}
          />
        </RightsManage>
      )}
    </>
  )
}
