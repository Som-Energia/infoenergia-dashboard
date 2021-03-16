import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'

import Tabs from '../components/Tabs'

import { getTimeCurves } from '../services/TimeCurves'
import TimeCurves from '../containers/TimeCurves'

const ExtraButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 8px;

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
  const [data, setData] = useState([])
  const [type, setType] = useState('LINE_CHART_TYPE')

  useEffect(function () {
    getTimeCurves()
      .then((response) => {
        response ? setData(response) : setData([])
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
            &nbsp;Descarrega
          </button>
        </li>
      </ul>
    </ExtraButtonsWrapper>
  )

  return (
    <div className="container">
      <Tabs
        tabs={[
          {
            title: 'Diària',
            content: <TimeCurves period="DAILY" chartType={type} data={data} />,
          },
          {
            title: 'Setmanal',
            content: (
              <TimeCurves period="WEEKLY" chartType={type} data={data} />
            ),
          },
          {
            title: 'Mensual',
            content: (
              <TimeCurves period="MONTHLY" chartType={type} data={data} />
            ),
          },
          {
            title: 'Anual',
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
