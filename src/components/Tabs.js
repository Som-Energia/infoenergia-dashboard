import React, { useState } from 'react'
import styled from 'styled-components'

const defaultTabs = [[
  { title: 'Tab 1', content: <div>Tab 1 content</div> },
  { title: 'Tab 2', content: <div>Tab 2 content</div> },
  { title: 'Tab 3', content: <div>Tab 3 content</div> }
]]

export default function Tabs ({ tabs = defaultTabs }) {
  const [activeTab, setActiveTab] = useState(0)
  const activeTabContent = () => tabs[activeTab]?.content

  const Tabs = styled.ul`
    border-bottom: 0;
    padding: 16px 8px;
    background: #fff;
    display: flex;
    list-style: none;
    margin-bottom: 0;
  `
  const Tab = styled.li`
    background-color: #f2f2f2;
    margin: 0 4px;
    padding: 8px;
    button {
      color: #585857;
      font-weight: bold;
      background: transparent;
      border: 0;
    }
    &.active {
      background-color: #96b633;
      button {
        color: #fff !important;
        background: transparent
      }
    }
  `
  const TabContentWrapper = styled.div`
    background-color: #fff;
    padding: 0 16px 16px;
  `

  return (
    <React.Fragment>
      <Tabs role="tablist">
        {tabs.map(({ title }, index) => (
          <Tab key={index} className={activeTab === index ? 'active' : null}>
            <button href="#" role="tab" onClick={() => { setActiveTab(index) }}>
              {title}
            </button>
          </Tab>
        ))
        }
      </Tabs>
      <TabContentWrapper>
        {activeTabContent()}
      </TabContentWrapper>
    </React.Fragment>
  )
}