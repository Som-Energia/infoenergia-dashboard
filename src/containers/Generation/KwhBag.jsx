import React, { useContext, useEffect, useMemo, useState } from 'react'
import Grid from '@mui/material/Grid'
import StackedBarChart from '../../components/Generation/StackedBarChart'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles';
import {
  groupYearlyDataAccumulation,
  period2ColorKwhBag
} from '../../services/utils'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { getLastInvoiceDatePriorityContract } from '../../services/api'
import PeriodSelector from '../../components/Generation/PeriodSelector'

function createData(periodes, kwh) {
  return { periodes, kwh }
}

const useStyles = makeStyles((theme) => ({
  tab: {
    color: 'primary',
  },
  divRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette?.background?.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}
))

export default function KwhBag(props) {
  const { token, lastInvoiceDatePriorityContract } = props
  const { kWhRemaining, loadingRemain } =
    useContext(GenerationUseContext)
  const [periods, setPeriods] = useState('Taula_Peatges_20')
  const [date, setDate] = useState(lastInvoiceDatePriorityContract)
  const { t } = useTranslation()

  const handleChange = (event) => {
    setPeriods(event.target.value)
  }
  const classes = useStyles()

  const groupedData = useMemo(() => {
    const groupData = groupYearlyDataAccumulation(kWhRemaining, periods)
    delete groupData.value
    const data = { periods: {}, fills: {} }
    const groupDataKeys = Object.keys(groupData)
    const is3Period = groupDataKeys.length === 3;
    groupDataKeys.forEach((element) => {
      const suffix = is3Period ? '_P' : '';
      data.periods[t(element + suffix)] = groupData[element]
      data.fills[t(element + suffix)] = period2ColorKwhBag[element]
    })

    return data
  }, [kWhRemaining, periods])

  const rows = useMemo(
    () =>
      Object.keys(groupedData.periods).map((element) => {
        return createData(t(element), groupedData.periods[element])
      }),
    [groupedData]
  )

  const getDate = async () => {
    try {
      const result = await getLastInvoiceDatePriorityContract(token)
      setDate(result?.data?.date)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!date) {
      getDate()
    }
  }, [])

  return (
    <>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Grid item container xs={12} sm={6}>
          <h3>{t('GENERATION_KWH_BAG_TITLE')}</h3>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={2}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: '10px',
          }}
        >
          <PeriodSelector handleChange={handleChange} periods={periods} />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
      >
        {loadingRemain ? (
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm={5}>
              <StackedBarChart data={groupedData} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {t('GENERATION_KWH_BAG_TABLE_PERIOD')}
                      </TableCell>
                      <TableCell>{t('GENERATION_KWH_BAG_TABLE_KWH')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.periodes}>
                        <TableCell component="th" scope="row">
                          {t(row.periodes)}
                        </TableCell>
                        <TableCell>{row.kwh}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </>
        )}
      </Grid>
      <Grid container item xs={12}>
        <Typography
          id="date-info"
          dangerouslySetInnerHTML={{
            __html: t('GENERATION_KWH_BAG_DESCRIPTION', {
              date: new Date(date).toLocaleDateString('es-ES'),
            }),
          }}
        />
      </Grid>
    </>
  )
}
