import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DatePicker from 'components/DatePicker/DatePicker'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { capitalizeWord } from 'services/utils'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import GenerationUseContext from '../../contexts/GenerationUseContext'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const viewTypes = ['month', 'year']

export default function Use() {
  const { t } = useTranslation()
  const {
    selectedDate,
    viewTypeValue,
    setSelectedDate,
    setViewTypeValue,
    assignmentsTableFormat,
  } = useContext(GenerationUseContext)
  const classes = useStyles()

  const handleDateChange = (date, event) => {
    if (event) {
      event.preventDefault()
    }
    setSelectedDate(date)
  }

  const handleViewTypeChange = (event) => {
    setViewTypeValue(event.target.value)
  }


  return (
    <>
      <Grid
        container
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <Typography variant="h4" component="h1" style={{ color: '#96B633' }}>
            {assignmentsTableFormat.total + ' kWh'}
          </Typography>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Total{' '}
              {capitalizeWord(
                selectedDate.toLocaleString('ca-ES', { month: 'long' })
              )}
            </Typography>
            <Typography style={{ color: '#96B633' }}>
              {selectedDate.getFullYear()}
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={12}
          component="label"
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
          }}
          spacing={1}
        >
          <Grid item xs={12} sm={2}>
            <DatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              type={viewTypes[viewTypeValue]}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <Select
                native
                value={viewTypeValue}
                onChange={handleViewTypeChange}
                inputProps={{
                  name: 'viewType',
                  id: 'type-view-select',
                }}
              >
                <option id="month-option" value={0}>
                  {t('Month')}
                </option>
                <option id="year-option" value={1}>
                  {t('Year')}
                </option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {assignmentsTableFormat.columns.map((element) => (
                <TableCell key={element}>{element}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody id='table-body-assignment-consumption'>
            {assignmentsTableFormat?.rows.map((element) => (
              <TableRow key={element.id}>
                {Object.keys(element).map((id, index) => (
                  <TableCell key={element[id] + index}>{element[id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
