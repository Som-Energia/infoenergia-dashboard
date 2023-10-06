import React, {useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Use from '../containers/Generation/Use'
import GenerationKwhTable from '../containers/Generation/GenerationKwhTable'
/* import Switch from '@material-ui/core/Switch' */
import DatePicker from 'components/DatePicker/DatePicker'
import { capitalizeWord } from 'services/utils'

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
    backgroundColor: theme.palette.background.paper,
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function Panel({ title, value, index }) {
  return (
    <TabPanel value={value} index={index}>
      {title}
    </TabPanel>
  )
}

const sections = ['Primer', 'Segon', 'Tercer']

function ProductionConsumption() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  /* const [intervalType, setIntervalType] = useState('month') */

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const [value, setValue] = React.useState(0)
  const classes = useStyles()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function getPanel(value, index, element) {
    if (value === 0) {
      return (
        <TabPanel value={value} index={index}>
          <Use key={index} title={element} value={value} index={index} />
        </TabPanel>
      )
    } else if (value === 1) {
      return (
        <TabPanel value={value} index={index}>
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              component="label"
              container
              style={{ alignItems: 'center', display: 'flex', gap: '20px' }}
              spacing={1}
            >
              {/* <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>Mensual</Grid>
                  <Grid item>
                    <Switch />
                  </Grid>
                  <Grid item>Anual</Grid>
                </Grid>
              </Typography> */}
              <DatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                type={'month'}
              />
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: '10px',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                style={{ color: '#96B633' }}
              >
                400 kWh
              </Typography>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography style={{ fontWeight: 'bold' }}>
                  Total {capitalizeWord(selectedDate.toLocaleString('ca-ES',{month:'long'}))}
                </Typography>
                <Typography style={{ color: '#96B633' }}>{selectedDate.getFullYear()}</Typography>
              </Box>
            </Box>
          </Grid>
          <GenerationKwhTable />
        </TabPanel>
      )
    } else {
      return <Panel key={index} title={element} value={value} index={index} />
    }
  }

  return (
    <Grid>
      <Grid container className={classes.divRoot}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Active" {...a11yProps} />
          <Tab label="Disabled" {...a11yProps} />
          <Tab label="Active" {...a11yProps} />
        </Tabs>
        <button>DESCARREGA</button>
      </Grid>
      {sections.map((element, index) => getPanel(value, index, element))}
    </Grid>
  )
}

export default ProductionConsumption
