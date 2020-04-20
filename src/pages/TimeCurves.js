import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'

import Tabs from '../components/Tabs'

import { getTimeCurves } from '../services/TimeCurves'
import TimeCurves from '../containers/TimeCurves'

const ExtraButtonsWrapper = styled.div`
  width: 100%;
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

function TimeCurvesPage () {
  const [data, setData] = useState([])
  const [charType, setCharType] = useState('LINE_CHART_TYPE')

  useEffect(function () {
    getTimeCurves()
      .then(response => {
        console.log(response)
        setData(response)
      })
      .catch(error => setData([]))
  }, [])

  const extraControls = () => (
    <ExtraButtonsWrapper>
      <ul>
        <li className={ (charType === 'LINE_CHART_TYPE') ? 'active' : null }>
          <button onClick={ () => setCharType('LINE_CHART_TYPE') }><TimelineOutlinedIcon /></button>
        </li>
        <li className={ (charType === 'BAR_CHART_TYPE') ? 'active' : null }>
          <button onClick={ () => setCharType('BAR_CHART_TYPE') }><BarChartOutlinedIcon /></button>
        </li>
        <li>
          <button onClick={ () => console.log('descarrega!') }><GetAppIcon />&nbsp;Descarrega</button>
        </li>
      </ul>
    </ExtraButtonsWrapper>
  )

  return (
    <div className="container">
      <Tabs tabs={[
        { title: 'Diària', content: <TimeCurves period="DAILY" chartType={charType} data={data} /> },
        { title: 'Setmanal', content: <TimeCurves period="WEEKLY" chartType={charType} data={data} /> },
        { title: 'Mensual', content: <TimeCurves period="MONTHLY" chartType={charType} data={data} /> },
        { title: 'Anual', content: <TimeCurves period="YEARLY" chartType={charType} data={data} /> }
      ]} extra={extraControls()} />
    </div>
  )
}

export default TimeCurvesPage
