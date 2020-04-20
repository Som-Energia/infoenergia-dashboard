import React from 'react'

import Tabs from '../components/Tabs'
import moment from 'moment'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'

function EnergyUse () {
  const tabs = [
    { title: 'Perfil típic diari', content: <TipicialDailyProfile /> },
    { title: 'Perfil típic setmanal', content: <TipicalWeeklyProfile /> },
    { title: 'Perfil últims 3 mesos', content: <div>Perfil últims 3 mesos</div> },
    { title: 'Perfil estacional', content: <div>Perfil estacional</div> }
  ]

  return (
    <div className="container">
      <Tabs tabs={tabs} initialTab={0} />
    </div>
  )
}

export default EnergyUse
