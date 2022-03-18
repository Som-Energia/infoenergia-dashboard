import { createContext, useState } from 'react'

const TimeCurvesContext = createContext({
  timeCurves: [],
  setTimeCurves: () => {},
  filteredTimeCurves: [],
  setFilteredTimeCurves: () => {},
})

export const TimeCurvesContextProvider = (props) => {
  const [timeCurves, setTimeCurves] = useState([])
  const [filteredTimeCurves, setFilteredTimeCurves] = useState([])

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
