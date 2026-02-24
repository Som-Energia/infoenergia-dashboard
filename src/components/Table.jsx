import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { Table } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableCell } from '@mui/material'
import { TableContainer } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'
import { Paper } from '@mui/material'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function CustomTable(props) {
  const classes = useStyles()
  const { columns, rows, id } = props

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((element) => (
              <TableCell key={element}>{element}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody id={id}>
          {rows.map((element) => (
            <TableRow key={element.id}>
              {Object.keys(element).map((id, index) => (
                <TableCell key={element[id] + index}>{element[id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
