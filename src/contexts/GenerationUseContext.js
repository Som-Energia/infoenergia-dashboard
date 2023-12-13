import { createContext, useState, useEffect } from 'react'
import { getConsumption, getkWhRemaining } from '../services/api'
import { formatOrdinals, getDataForTable } from '../services/utils'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'


const initValues = {
  selectedDate: null,
  viewTypeValue: null,
  assignmentsTableFormat: {},
}
const GenerationUseContext = createContext(initValues)

export const GenerationUseContextProvider = (props) => {
  const { t } = useTranslation()
  const { language } = useParams()
  const {
    token,
    generationAssignments,
    initViewTypeValue = 0,
    initSelectedDate = new Date(),
    initAssignmentsTableFormat = { columns: [], rows: [], total: 0 },
    initKWhRemaining = [],
    isTestMode = false,
    isloadingUse = false,
    isloadingRemain = false
  } = props

  const [selectedDate, setSelectedDate] = useState(initSelectedDate)
  const [is3Period, setIs3Period] = useState(false)
  const [viewTypeValue, setViewTypeValue] = useState(initViewTypeValue)
  const [loadingUse, setLoadingUse] = useState(isloadingUse)
  const [loadingRemain, setLoadingRemain] = useState(isloadingRemain)

  const [assignmentsTableFormat, setAssignmentsTableFormat] = useState(
    initAssignmentsTableFormat
  )
  const [kWhRemaining , setkWhRemaining] = useState(initKWhRemaining)

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
        consumption.data,
        getPriority
      )
      setIs3Period(assignmentsTableFormat.is3period)
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

  useEffect(
    function () {
      if (!isTestMode) {
        getRemainigData()
      }
    },
    []
  )

  useEffect(
    function () {
      if (!isTestMode) {
        getUseData()
      }
    },
    [viewTypeValue, generationAssignments, selectedDate]
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
        loadingUse,
        loadingRemain,
        is3Period
      }}
    >
      {props.children}
    </GenerationUseContext.Provider>
  )
}

export default GenerationUseContext
