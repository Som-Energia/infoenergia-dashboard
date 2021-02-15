import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

import TipicialDailyProfile from '../containers/TipicalDailyProfile'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'

import Tabs from '../components/Tabs'

function EnergyUse (props) {
  const { token, contract } = props
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  const tabs = [
    {
      title: t('TIPICAL_DAILY_PROFILE'),
      content: <TipicialDailyProfile {...props} />
    }, {
      title: t('TIPICAL_WEEKLY_PROFILE'),
      content: <TipicalWeeklyProfile {...props} />
    }, {
      title: t('LAST_3_MONTH_PROFILE'),
      content: <LastMonthProfile {...props} />
    }, {
      title: t('SEASONAL_PROFILE'),
      content: <SeasonalProfile {...props} />
    }
  ]

  return (
    token && contract
      ?
      <div>
        <Tabs tabs={tabs} initialTab={0} />
      </div>
      :
      <div>
        { t('NO_DATA') }
      </div>
  )
}

export default EnergyUse
