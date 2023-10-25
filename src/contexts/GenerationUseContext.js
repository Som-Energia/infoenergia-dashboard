import { createContext, useState, useEffect } from 'react'
import { getConsumption, /* getkWhRemaining */ } from '../services/api'
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
    /* initKWhRemaining = [], */
    isTestMode = false,
  } = props

  const [selectedDate, setSelectedDate] = useState(initSelectedDate)
  const [viewTypeValue, setViewTypeValue] = useState(initViewTypeValue)
  const [assignmentsTableFormat, setAssignmentsTableFormat] = useState(
    initAssignmentsTableFormat
  )
 /*  const [kWhRemaining, setkWhRemaining] = useState(initKWhRemaining) */

  const getPriority = (priorityNumber) => {
    return priorityNumber === 0
      ? t('GENERATION_MAIN_PRIORITY')
      : formatOrdinals(language, priorityNumber + 1)
  }

  const getData = async () => {
    try {
      const consumption = await getConsumption(
        selectedDate,
        token,
        viewTypeValue
      )
      const assignmentsTableFormat = getDataForTable(
        generationAssignments,
        consumption,
        getPriority
      )
      setAssignmentsTableFormat(assignmentsTableFormat)
   /*    const gwkRemaining = await getkWhRemaining(token)
      setkWhRemaining(gwkRemaining) */
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(
    function () {
      if (!isTestMode) {
        getData()
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
        /* kWhRemaining, */
      }}
    >
      {props.children}
    </GenerationUseContext.Provider>
  )
}

export default GenerationUseContext
