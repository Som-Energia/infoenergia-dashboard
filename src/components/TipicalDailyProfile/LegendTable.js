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
    minWidth: 650    
  },
  squareColor: {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    margin: '0 8px',
  },
})

const TableItem = ({ data }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const monthsData = data.months.map((element) => t(element))
  
  return (
    <>
      <TableCell>
        <span>{monthsData.join(', ')}</span>
      </TableCell>
      {data.intervalPeriods.map((element, index) => {
        return (
          <TableCell key={element + index}>
            <span className="item">
              <span
                className={classes.squareColor}
                style={{
                  backgroundColor: period2Color[element.period],
                }}
              ></span>
              <span>
                <b>{element.period}</b>
              </span>
            </span>
          </TableCell>
        )
      })}
    </>
  )
}


export default function DenseTable({ header, data }) {
  const classes = useStyles()
  
  return (
    <TableContainer >
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Mesos</TableCell>
            {header.map((element, index) => {
              return (
                <TableCell key={element + index}>
                  {element.start + 'h - ' + element.end + 'h'}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? Object.keys(data).map((element, index) => (
                <TableRow key={element + index}>
                  <TableItem data={data[element]} />
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
