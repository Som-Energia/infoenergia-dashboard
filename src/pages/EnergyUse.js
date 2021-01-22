import React from 'react'
import { useTranslation } from 'react-i18next'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'

import Tabs from '../components/Tabs'

function EnergyUse (props) {
  const { token, contract = '0065020' } = props
  const { t } = useTranslation()

  const tabs = [
    {
      title: t('TIPICAL_DAILY_PROFILE'),
      content: <TipicialDailyProfile contract={contract} token={token} />
    },
    {
      title: t('TIPICAL_WEEKLY_PROFILE'),
      content: <TipicalWeeklyProfile contract={contract} token={token} />
    },
    {
      title: t('LAST_3_MONTH_PROFILE'),
      content: <LastMonthProfile contract={contract} token={token} />
    },
    {
      title: t('SEASONAL_PROFILE'),
      content: <SeasonalProfile contract={contract} token={token} />
    }
  ]

  return (
    <div className="container">
      <Tabs tabs={tabs} initialTab={0} />
    </div>
  )
}

export default EnergyUse
