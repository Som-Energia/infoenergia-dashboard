import React from 'react'

import Tabs from '../components/Tabs'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'

const contract = '0090366'

const tabs = [
  { title: 'Perfil típic diari', content: <TipicialDailyProfile contract={contract} /> },
  { title: 'Perfil típic setmanal', content: <TipicalWeeklyProfile contract={contract} /> },
  { title: 'Perfil últims 3 mesos', content: <LastMonthProfile contract={contract} /> },
  { title: 'Perfil estacional', content: <SeasonalProfile contract={contract} /> }
]

function EnergyUse () {
  return (
    <div className="container">
      <Tabs tabs={tabs} initialTab={0} />
    </div>
  )
}

export default EnergyUse
