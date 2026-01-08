import { createContext, useState, useEffect } from 'react'
import { getConsumption, getkWhRemaining, getkWhRecord } from '../services/api'
import {
  formatOrdinals, getDataForTable
} from '../services/utils'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'
import 'dayjs/locale/eu'
import 'dayjs/locale/gl'





const initValues = {
  selectedDate: null,
  viewTypeValue: null,
  assignmentsTableFormat: {},
}

const GenerationUseContext = createContext(initValues)

export const GenerationUseContextProvider = (props) => {
  const MONTH = 'MONTHLY'
  const YEAR = 'YEARLY'

  const { language } = useParams()
  const { t, i18n } = useTranslation('translation', { lng: language })

  const {
    token,
    generationAssignments,
    initViewTypeValue = MONTH,
    initSelectedDate = dayjs().locale(language),
    initAssignmentsTableFormat = { columns: [], rows: [], total: 0 },
    initKWhRemaining = [],
    initKWhRecord = [],
    isTestMode = false,
    isloadingUse = false,
    isloadingRemain = false,
    isloadingRecord = false,
  } = props



  const [selectedDate, setSelectedDate] = useState(initSelectedDate)
  const [is3Period, setIs3Period] = useState(false)
  const [viewTypeValue, setViewTypeValue] = useState(initViewTypeValue)
  const [loadingUse, setLoadingUse] = useState(isloadingUse)
  const [loadingRemain, setLoadingRemain] = useState(isloadingRemain)
  const [loadingRecord, setLoadingRecord] = useState(isloadingRecord)

  const [assignmentsTableFormat, setAssignmentsTableFormat] = useState(
    initAssignmentsTableFormat
  )
  const [kWhRemaining, setkWhRemaining] = useState(initKWhRemaining)
  const [kWhRecord, setkWhRecord] = useState(initKWhRecord)

  const threePeriodsColumns = [
    t('GENERATION_KWH_USE_TABLE_CONTRACT_ADDRESS'),
    t('GENERATION_KWH_USE_TABLE_PRIORITY'),
    t('GENERATION_KWH_USE_TABLE_VALLEY'),
    t('GENERATION_KWH_USE_TABLE_FLAT'),
    t('GENERATION_KWH_USE_TABLE_PICK'),
    t('GENERATION_KWH_USE_TABLE_TOTAL'),
  ]

  const sixPeriodsColumns = [
    t('GENERATION_KWH_USE_TABLE_CONTRACT_ADDRESS'),
    t('GENERATION_KWH_USE_TABLE_PRIORITY'),
    'P6',
    'P5',
    'P4',
    'P3',
    'P2',
    'P1',
    t('GENERATION_KWH_USE_TABLE_TOTAL'),
  ]




  const Is3Period = () => {
    let result = true
    generationAssignments.forEach((element) => {
      result = result && (element.contract_tariff.includes('2.0') || element.contract_tariff === "")
    })
    setIs3Period(result)
  }

  const getPriority = (priorityNumber) => {
    return priorityNumber === 0
      ? t('GENERATION_MAIN_PRIORITY')
      : formatOrdinals(language, priorityNumber + 1)
  }


  const getUseData = async () => {
    try {
      setLoadingUse(true)
      const consumption = await getConsumption(
        selectedDate,
        token,
        viewTypeValue
      )

      const assignmentsTableFormat = getDataForTable(
        generationAssignments,
        consumption.data
      )

      const assignmentsTableFormatTmp = JSON.parse(JSON.stringify(assignmentsTableFormat.data))
      const maxLength = assignmentsTableFormatTmp?.dataKeys?.length
      assignmentsTableFormat.data.columns = maxLength === 3
        ? threePeriodsColumns
        : sixPeriodsColumns

      assignmentsTableFormatTmp.rows.forEach(row => { row.priority = row.priority !== '-' ? getPriority(row.priority) : '-' })

      assignmentsTableFormat.data.rows = assignmentsTableFormatTmp.rows

      setAssignmentsTableFormat(assignmentsTableFormat.data)
      setLoadingUse(false)
    } catch (e) {
      setLoadingUse(false)
      console.log(e)
    }
  }

  const getRemainigData = async () => {
    try {
      setLoadingRemain(true)
      const gwkRemaining = await getkWhRemaining(token)
      setkWhRemaining(gwkRemaining?.data)
      setLoadingRemain(false)
    } catch (e) {
      setLoadingRemain(false)
      console.log(e)
    }
  }

  const getRecordData = async () => {
    try {
      setLoadingRecord(true)
      const gkwRecord = await getkWhRecord(selectedDate, token)
      setkWhRecord(gkwRecord?.data)
      setLoadingRecord(false)
    } catch (e) {
      setLoadingRecord(false)
      console.log(e)
    }
  }

  useEffect(() => {
    language && i18n.changeLanguage(language)
  }, [language, i18n])


  useEffect(
    function () {
      if (!isTestMode) {
        getRecordData()
      }
    },
    [selectedDate]
  )

  useEffect(function () {
    if (!isTestMode) {
      getRemainigData()
    }
  }, [])

  useEffect(
    function () {
      if (!isTestMode) {
        getUseData()
      }
    },
    [viewTypeValue, generationAssignments, selectedDate]
  )

  useEffect(
    function () {
      if (!isTestMode) {
        Is3Period()
      }
    },
    [generationAssignments]
  )

  return (
    <GenerationUseContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        viewTypeValue,
        setViewTypeValue,
        assignmentsTableFormat,
        kWhRemaining,
        kWhRecord,
        loadingUse,
        loadingRemain,
        loadingRecord,
        is3Period,
        MONTH,
        YEAR
      }}
    >
      {props.children}
    </GenerationUseContext.Provider>
  )
}

export default GenerationUseContext
