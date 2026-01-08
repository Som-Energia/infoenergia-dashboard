import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
