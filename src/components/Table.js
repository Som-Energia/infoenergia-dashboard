import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function Talbe(props) {
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
