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

import Tabs from 'components/Tabs'
import TimeCurves from 'containers/TimeCurves'
import { getTimeCurves } from 'services/timecurves'
import TimeCurvesContext from 'contexts/TimeCurvesContext'

import { CSVLink } from 'react-csv'
import { CnmcformatData } from 'services/utils'

function TimeCurvesPage(props) {
  const { language } = useParams()
  const { t, i18n } = useTranslation()

  const { timeCurves, setTimeCurves, filteredTimeCurves } =
    useContext(TimeCurvesContext)

  const {
    token,
    contract,
    cups,
    now = dayjs(),
  } = props

  const [type, setType] = useState('LINE_CHART_TYPE')

  useEffect(() => {
    language && i18n.changeLanguage(language)
    language ? dayjs.locale(language) : dayjs.locale('es')
  }, [language, i18n])

  useEffect(function () {
    const requestData = async () => {
      const responses = await Promise.all(
        [3,2,1,0].map((yearsago) => {
          return getTimeCurves({
            token,
            cups,
            currentMonth: now.subtract(yearsago, 'year').format('YYYYMM'),
          })
        })
      )
      setTimeCurves(responses.flat())
    }
    requestData()
  }, [token, cups])

  const DownloadButton = (props) => {
    const { children } = props

    const [headers, data] = CnmcformatData({
      data: filteredTimeCurves,
      cups: cups,
    })

    return (
      <CSVLink
        className="controlBtn"
        filename={`infoenergia-${contract}.csv`}
        headers={headers}
        data={data}
      >
        {children}
      </CSVLink>
    )
  }

  const ExtraControls = () => (
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

  return (
    <div>
      <Tabs
        tabs={[
          {
            title: t('DAILY'),
            content: (
              <TimeCurves period="DAILY" chartType={type} data={timeCurves} />
            ),
          },
          {
            title: t('WEEKLY'),
            content: (
              <TimeCurves period="WEEKLY" chartType={type} data={timeCurves} />
            ),
          },
          {
            title: t('MONTHLY'),
            content: (
              <TimeCurves period="MONTHLY" chartType={type} data={timeCurves} />
            ),
          },
          {
            title: t('YEARLY'),
            content: (
              <TimeCurves period="YEARLY" chartType={type} data={timeCurves} />
            ),
          },
        ]}
        extra={<ExtraControls />}
      />
    </div>
  )
}

export default TimeCurvesPage

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
