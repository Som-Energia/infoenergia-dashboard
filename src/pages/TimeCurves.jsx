import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'

import Tabs from '../components/Tabs'
import TimeCurves from '../containers/TimeCurves'
import ContractSelectorWrapper, {
  ContractContext,
} from '../containers/ContractSelectorWrapper'
import TimeCurvesContext, {
  TimeCurvesContextProvider,
} from '../contexts/TimeCurvesContext'

import { CSVLink } from 'react-csv'
import { CnmcformatData } from '../services/utils'

const DownloadButton = (props) => {
  const { children } = props
  const { filteredTimeCurves } = useContext(TimeCurvesContext)
  const contract = useContext(ContractContext)


  const [headers, data] = CnmcformatData({
    data: filteredTimeCurves,
    cups: contract.cups,
  })

  return (
    <CSVLink
      className="controlBtn"
      filename={`infoenergia-${contract.name}.csv`}
      headers={headers}
      data={data}
    >
      {children}
    </CSVLink>
  )
}

const ExtraControls = (props) => {
  const {type, setType} = props
  const {t} = useTranslation()
  return (
    <ExtraButtonsWrapper>
      <ul>
        <li className={type === 'LINE_CHART_TYPE' ? 'active' : null}>
          <button
            className="controlBtn"
            onClick={() => setType('LINE_CHART_TYPE')}
          >
            <TimelineOutlinedIcon fontSize="small" />
          </button>
        </li>
        <li className={type === 'BAR_CHART_TYPE' ? 'active' : null}>
          <button
            className="controlBtn"
            onClick={() => setType('BAR_CHART_TYPE')}
          >
            <BarChartOutlinedIcon fontSize="small" />
          </button>
        </li>
        <li>
          <DownloadButton>
            <GetAppIcon fontSize="small" />
            &nbsp;{t('DOWNLOAD')}
          </DownloadButton>
        </li>
      </ul>
    </ExtraButtonsWrapper>
  )
}

function TimeCurvesPage(props) {
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  const { timeCurves } = useContext(TimeCurvesContext)
  const contract = useContext(ContractContext)
  const [type, setType] = useState('LINE_CHART_TYPE')


  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  return (
    <Tabs
      tabs={[
        {
          title: t('DAILY'),
          content: (
            <TimeCurves
              period="DAILY"
              chartType={type}
              data={timeCurves}
              contract={contract}
            />
          ),
        },
        {
          title: t('WEEKLY'),
          content: (
            <TimeCurves
              period="WEEKLY"
              chartType={type}
              data={timeCurves}
              contract={contract}
            />
          ),
        },
        {
          title: t('MONTHLY'),
          content: (
            <TimeCurves
              period="MONTHLY"
              chartType={type}
              data={timeCurves}
              contract={contract}
            />
          ),
        },
        {
          title: t('YEARLY'),
          content: (
            <TimeCurves
              period="YEARLY"
              chartType={type}
              data={timeCurves}
              contract={contract}
            />
          ),
        },
      ]}
      extra={<ExtraControls type={type} setType={setType} />}
    />
  )
}

function TimeCurvePageWrapper(props) {
  const { language } = useParams()
  const { t, i18n } = useTranslation()
  const { token, now = dayjs() } = props
  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  return (
    <ContractSelectorWrapper title={t('SECTION_TITLE_HOURLY_CURVES')}>
      <TimeCurvesContextProvider token={token} now={now}>
        <TimeCurvesPage {...props}></TimeCurvesPage>
      </TimeCurvesContextProvider>
    </ContractSelectorWrapper>
  )
}

export default TimeCurvePageWrapper

const ExtraButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 12px;

  & > ul {
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    display: flex;
    list-style: none;

    & li {
      background-color: #585857;
      margin: 0;
      padding: 0;

      &.active {
        background-color: #96b633;
      }

      &:last-child {
        margin-left: 16px;
      }

      .controlBtn {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        color: #fff;
        font-weight: bold;
        background: transparent;
        border: 0;
        text-decoration: none;
      }
    }
  }
`
