import React, { useState, useEffect } from 'react'
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

import { getTimeCurves } from '../services/timecurves'
import { completeYearData } from '../services/utils'

import TimeCurves from '../containers/TimeCurves'

const ExtraButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 16px 0;

  & > ul {
    border-bottom: 0;
    background: transparent;
    display: flex;
    list-style: none;
    margin-bottom: 0;

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

      button {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        color: #fff;
        font-weight: bold;
        background: transparent;
        border: 0;
      }
    }
  }
`

function TimeCurvesPage() {
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  const [data, setData] = useState([])
  const [type, setType] = useState('LINE_CHART_TYPE')

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  useEffect(function () {
    getTimeCurves()
      .then((response) => {
        console.log(response)
        if (response) {
          const origData = response
          console.log(origData)
          const completeData = completeYearData(origData)
          console.log(completeData)
          setData(completeData)
        } else {
          setData([])
        }
      })
      .catch((error) => {
        console.log(error)
        setData([])
      })
  }, [])

  const ExtraControls = () => (
    <ExtraButtonsWrapper>
      <ul>
        <li className={type === 'LINE_CHART_TYPE' ? 'active' : null}>
          <button onClick={() => setType('LINE_CHART_TYPE')}>
            <TimelineOutlinedIcon />
          </button>
        </li>
        <li className={type === 'BAR_CHART_TYPE' ? 'active' : null}>
          <button onClick={() => setType('BAR_CHART_TYPE')}>
            <BarChartOutlinedIcon />
          </button>
        </li>
        <li>
          <button onClick={() => console.log('descarrega!')}>
            <GetAppIcon />
            &nbsp;{t('Descarrega')}
          </button>
        </li>
      </ul>
    </ExtraButtonsWrapper>
  )

  return (
    <div>
      <Tabs
        tabs={[
          {
            title: t('Diària'),
            content: <TimeCurves period="DAILY" chartType={type} data={data} />,
          },
          {
            title: t('Setmanal'),
            content: (
              <TimeCurves period="WEEKLY" chartType={type} data={data} />
            ),
          },
          {
            title: t('Mensual'),
            content: (
              <TimeCurves period="MONTHLY" chartType={type} data={data} />
            ),
          },
          {
            title: t('Anual'),
            content: (
              <TimeCurves period="YEARLY" chartType={type} data={data} />
            ),
          },
        ]}
        extra={<ExtraControls />}
      />
    </div>
  )
}

export default TimeCurvesPage
