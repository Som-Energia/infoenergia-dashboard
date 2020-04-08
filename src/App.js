import React, { useState } from 'react'
import styled from 'styled-components'
import './App.css'

import TipicialDailyProfile from './containers/TipicalDailyProfile'
import TipicalWeeklyProfile from './containers/TipicalWeeklyProfile'

function App () {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { title: 'Perfil típic diari' },
    { title: 'Perfil típic setmanal' },
    { title: 'Perfil últims 3 mesos' },
    { title: 'Perfil estacional' },
  ]

  const activeComponent = () => {
    switch (activeTab) {
      case 1:
        return <TipicalWeeklyProfile />
      case 2:
        return <></>
      case 3:
        return <></>
      default:
        return <TipicialDailyProfile />
    }
  }

  const Tabs = styled.ul`
    border-bottom: 0;
    padding: 16px 12px;
    background: #fff;
  `
  const Tab = styled.li`
    background-color: #f2f2f2;
    margin: 0 4px;
    border: 0;
    border-radius: 0;
    a {
      color: #585857 !important;
      font-weight: bold;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
    }
    &.active {
      background-color: #96b633;
      a {
        color: #fff !important;
      }      
    }    
  `

  const ComponentWrapper = styled.div`
    background-color: #fff;
    padding: 0 16px 16px;
  `
  return (

    <div className="container">
      <Tabs className="nav nav-tabs" role="tablist">
        {tabs.map((tab, index) => (
          <Tab key={index} className={activeTab === index ? 'active' : null}>
            <a href="#" role="tab" onClick={() => { setActiveTab(index) }}>{tab.title}</a>
          </Tab>
        ))
        }
      </Tabs>
      <ComponentWrapper>
        {activeComponent()}
      </ComponentWrapper>

    </div>
  )
}

export default App
