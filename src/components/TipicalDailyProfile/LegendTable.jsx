import React from 'react'
import { Table } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableCell } from '@mui/material'
import { TableContainer } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'
import { period2Color } from '../../services/utils'
import { useTranslation } from 'react-i18next'

const sxStyles = {
  tableCell: {
    border: 0,
  },
  squareColor: {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    margin: '0 8px',
  },
}

const TableItem = ({ data, isLast }) => {
  const { t } = useTranslation()
  const monthsData = data.months.map((element) => t(element))

  return (
    <>
      {isLast ? (
        <TableRow>
          <TableCell sx={sxStyles.tableCell}>
            <b>{t('WEEKEND_HOLIDAYS')}</b>
          </TableCell>
        </TableRow>
      ) : null}

      <TableRow>
        <TableCell sx={sxStyles.tableCell}>
          <span>{monthsData.join(', ')}</span>
        </TableCell>
        {data.intervalPeriods.map((element, index) => {
          return (
            <TableCell sx={sxStyles.tableCell} key={element + index}>
              <span>
                <span
                  style={{
                    ...sxStyles.squareColor,
                    ...{
                      backgroundColor: period2Color[element.period],
                    },
                  }}
                ></span>
                <span>
                  <b>{t(element.period)}</b>
                </span>
              </span>
            </TableCell>
          )
        })}
      </TableRow>
    </>
  )
}

export default function DenseTable({ header, data }) {
  const { t } = useTranslation()

  return (
    <TableContainer>
      <Table sx={{ minWidth: '100px' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={sxStyles.tableCell}></TableCell>
            {header.map((element, index) => {
              return (
                <TableCell sx={sxStyles.tableCell} key={element + index}>
                  <b>{element.start + 'h - ' + element.end + 'h'}</b>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={sxStyles.tableCell}>
              <b>{t('WORKING_DAYS')}</b>
            </TableCell>
          </TableRow>
          {data
            ? Object.keys(data).map((element, index) => (
                <TableItem
                  key={element + index}
                  data={data[element]}
                  isLast={Object.keys(data).length === index + 1}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
