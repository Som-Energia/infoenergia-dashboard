import React, { useContext } from 'react'
import Table from '../../components/Table'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import RightsManage from 'components/Generation/RightsManage'

export default function Use() {
  const { assignmentsTableFormat } = useContext(GenerationUseContext)

  return (
    <RightsManage>
      <Table
        columns={assignmentsTableFormat.columns}
        rows={assignmentsTableFormat?.rows}
        id={'table-body-assignment-consumption'}
      />
    </RightsManage>
  )
}
