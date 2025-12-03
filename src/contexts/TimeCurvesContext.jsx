import { createContext, useState, useContext, useEffect } from 'react'
import {ContractContext} from  '../containers/ContractSelectorWrapper'
import { getTimeCurves } from '../services/timecurves'

const TimeCurvesContext = createContext({
  timeCurves: [],
  setTimeCurves: () => {},
  filteredTimeCurves: [],
  setFilteredTimeCurves: () => {},
})

export const TimeCurvesContextProvider = (props) => {
  const [timeCurves, setTimeCurves] = useState([])
  const [filteredTimeCurves, setFilteredTimeCurves] = useState([])
  const contract = useContext(ContractContext)
  const {token, now} = props

  useEffect(
    function () {
      setTimeCurves([])
      const requestData = async () => {
        const responses = await Promise.all(
          [3, 2, 1, 0].map((yearsago) => {
            return getTimeCurves({
              token,
              cups: contract.cups,
              currentMonth: now.subtract(yearsago, 'year').format('YYYYMM'),
            })
          })
        )
        setTimeCurves(responses.flat())
      }
      requestData()
    },
    [token, contract.cups]
  )


  return (
    <TimeCurvesContext.Provider
      value={{
        timeCurves,
        setTimeCurves,
        filteredTimeCurves,
        setFilteredTimeCurves,
      }}
    >
      {props.children}
    </TimeCurvesContext.Provider>
  )
}

export default TimeCurvesContext
