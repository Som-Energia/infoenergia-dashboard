import React, { useEffect, useState } from 'react'

import Tabs from '../components/Tabs'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'

import { getContracts } from '../services/api'

function EnergyUse () {
  const [contract, setContract] = useState('0065020')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const tabs = [
    { title: 'Perfil típic diari', content: <TipicialDailyProfile contract={contract} /> },
    { title: 'Perfil típic setmanal', content: <TipicalWeeklyProfile contract={contract} /> },
    { title: 'Perfil últims 3 mesos', content: <LastMonthProfile contract={contract} /> },
    { title: 'Perfil estacional', content: <SeasonalProfile contract={contract} /> }
  ]

  useEffect(() => {
    getContracts()
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
  }, [])

  const handleChange = event => {
    event.preventDefault()
    setContract(event.target.value)
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'right' }}>
        <select onChange={handleChange}>
          { data.map(num => <option key={num} value={num}>{num}</option>) }
        </select>
      </div>
      <Tabs tabs={tabs} initialTab={0} />
    </div>
  )
}

export default EnergyUse
