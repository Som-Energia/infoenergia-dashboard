import React, { useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

import TipicalDailyProfile from '../containers/TipicalDailyProfile.jsx'
import TipicalWeeklyProfile from '../containers/TipicalWeeklyProfile'
import LastMonthProfile from '../containers/LastMonthsProfile'
import SeasonalProfile from '../containers/SeasonalProfile'
import ContractSelectorWrapper, { ContractContext } from '../containers/ContractSelectorWrapper'

import Tabs from '../components/Tabs'

function EnergyUse(props) {
  const { token } = props
  const { language } = useParams()
  const { t, i18n } = useTranslation()
  const contract = useContext(ContractContext)

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  const tabs = [
    {
      title: t('TIPICAL_DAILY_PROFILE'),
      content: (
        <TipicalDailyProfile
          {...props}
          contract={contract.name}
          tariff={contract.tariff}
        />
      ),
    },
    {
      title: t('TIPICAL_WEEKLY_PROFILE'),
      content: (
        <TipicalWeeklyProfile
          {...props}
          contract={contract.name}
          tariff={contract.tariff}
        />
      ),
    },
    {
      title: t('LAST_3_MONTH_PROFILE'),
      content: (
        <LastMonthProfile
          {...props}
          contract={contract.name}
          tariff={contract.tariff}
        />
      ),
    },
    {
      title: t('SEASONAL_PROFILE'),
      content: (
        <SeasonalProfile
          {...props}
          contract={contract.name}
          tariff={contract.tariff}
        />
      ),
    },
  ]

  return (
    <>
      {token && contract ? (
        <Tabs tabs={tabs} initialTab={0} />
      ) : (
        <div>{t('NO_DATA')}</div>
      )}
    </>
  )

}

function EnergyUsePageWrapper(props) {
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  return (
    <ContractSelectorWrapper title={t('SECTION_TITLE_ENERGY_USE')}>
      <EnergyUse {...props} />
    </ContractSelectorWrapper>
  )
}

export default EnergyUsePageWrapper
