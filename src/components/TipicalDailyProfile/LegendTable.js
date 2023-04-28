import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { period2Color } from '../../services/utils'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    border: 0,
  },
  squareColor: {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    margin: '0 8px',
  },
})

const TableItem = ({ data, isLast }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const monthsData = data.months.map((element) => t(element))

  return (
    <>
      {isLast ? (
        <TableRow>
          <TableCell className={classes.tableCell}>
            <b>{t('WEEKEND_HOLIDAYS')}</b>
          </TableCell>
        </TableRow>
      ) : null}

      <TableRow>
        <TableCell className={classes.tableCell}>
          <span>{monthsData.join(', ')}</span>
        </TableCell>
        {data.intervalPeriods.map((element, index) => {
          return (
            <TableCell className={classes.tableCell} key={element + index}>
              <span>
                <span
                  className={classes.squareColor}
                  style={{
                    backgroundColor: period2Color[element.period],
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
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}></TableCell>
            {header.map((element, index) => {
              return (
                <TableCell className={classes.tableCell} key={element + index}>
                  <b>{element.start + 'h - ' + element.end + 'h'}</b>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>
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
