import React from 'react'

import Tabs from '../components/Tabs'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'

const tabs = [
  { title: 'Perfil típic diari', content: <TipicialDailyProfile /> },
  { title: 'Perfil típic setmanal', content: <TipicalWeeklyProfile /> },
  { title: 'Perfil últims 3 mesos', content: <LastMonthProfile /> },
  { title: 'Perfil estacional', content: <SeasonalProfile /> }
]

function EnergyUse () {
  return (
    <div className="container">
      <Tabs tabs={tabs} initialTab={0} />
    </div>
  )
}

export default EnergyUse
