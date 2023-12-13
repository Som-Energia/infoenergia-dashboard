import React, { useEffect, useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Use from '../containers/Generation/Use'
import Record from 'containers/Generation/Record'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { CsvformatData } from '../services/utils'
import { CSVLink } from 'react-csv'
import GetAppIcon from '@material-ui/icons/GetApp'
import GenerationUseContext, {
  GenerationUseContextProvider,
} from 'contexts/GenerationUseContext'
import ExtraControls from 'components/ExtraControls/ExtraControlsHeader'

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const DownloadButton = () => {
  const { assignmentsTableFormat } = useContext(GenerationUseContext)
  const [headers, data] = CsvformatData(assignmentsTableFormat)
  const { t } = useTranslation()
  return (
    <CSVLink
      className="controlBtn"
      filename={`generationkwh.csv`}
      headers={headers}
      data={data}
    >
      <GetAppIcon fontSize="small" />
      &nbsp;{t('DOWNLOAD')}
    </CSVLink>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function ProductionConsumption(props) {
  const { language } = useParams()
  const { i18n, t } = useTranslation()
  const sections = [
    t('GENERATION_KWH_USE_SECTION_TITLE'),
    t('GENERATION_KWH_BAG_SECTION_TITLE'),
  ]
  const { setSelectedDate, setViewTypeValue } = useContext(GenerationUseContext)

  const { setSelectedDate, setViewTypeValue } = useContext(GenerationUseContext)

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  const [value, setValue] = React.useState(0)
  const classes = useStyles()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { assignmentsConsumption } = props

  const handleDateChange = (date, event) => {
    if (event) {
      event.preventDefault()
    }
    setSelectedDate(date)
  }

  const handleViewTypeChange = (event) => {
    setViewTypeValue(event.target.value)
  }

  const getPanel = (value, index, element) => {
    if (value === 0) {
      return (
        <TabPanel value={value} index={index}>
          <Use
            handleDateChange={handleDateChange}
            handleViewTypeChange={handleViewTypeChange}
            {...props}
          />
        </TabPanel>
      )
    } else if (value === 1) {
      return (
        <TabPanel value={value} index={index}>
          <Record
            handleDateChange={handleDateChange}
            handleViewTypeChange={handleViewTypeChange}
            {...props}
          />
        </TabPanel>
      )
    }
  }

  return (
    <GenerationUseContextProvider
      generationAssignments={assignmentsConsumption}
    >
      <Grid>
        <Grid container className={classes.divRoot}>
          <Tabs
            value={value}
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            indicatorColor="primary"
          >
            {sections.map((element) => (
              <Tab key={element} label={element} {...a11yProps} />
            ))}
          </Tabs>
          {value === 0 ? (
            <ExtraControls>
              <DownloadButton />
            </ExtraControls>
          ) : null}
        </Grid>
        {sections.map((element, index) => getPanel(value, index, element))}
      </Grid>
    </GenerationUseContextProvider>
  )
}

export default ProductionConsumption
