import React, { useState } from 'react'
import styled from 'styled-components'

const TabBarWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const TabList = styled.ul`
flex-grow: 1;
border-bottom: 0;
padding: 12px 8px 0;
background: #fff;
display: flex;
list-style: none;
margin-bottom: 0;
flex-wrap: wrap;
`
const Tab = styled.li`
background-color: #f2f2f2;
margin: 0 4px 16px;
padding: 0;
button {
  padding: 10px 16px;
  color: #585857;
  font-weight: 500;
  background: transparent;
  border: 0;
  white-space:nowrap;
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

const defaultTabs = [[
  { title: 'Tab 1', content: <div>Tab 1 content</div> },
  { title: 'Tab 2', content: <div>Tab 2 content</div> },
  { title: 'Tab 3', content: <div>Tab 3 content</div> }
]]

export default function Tabs ({ tabs = defaultTabs, extra, initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const activeTabContent = () => tabs[activeTab]?.content

  return (
    <React.Fragment>
      <TabBarWrapper>
        <TabList role="tablist">
          {tabs.map(({ title }, index) => (
            <Tab key={index} className={activeTab === index ? 'active' : null}>
              <button href="#" role="tab" onClick={() => { setActiveTab(index) }}>
                {title}
              </button>
            </Tab>
          ))
          }
        </TabList>
        { extra }
      </TabBarWrapper>

      <TabContentWrapper>
        {activeTabContent()}
      </TabContentWrapper>
    </React.Fragment>
  )
}
