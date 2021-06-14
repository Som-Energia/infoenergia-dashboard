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
  padding: 12px 16px 0;
  background: #fff;
  display: flex;
  list-style: none;
  margin-bottom: 0;
  flex-wrap: wrap;
`
const Tab = styled.li`
  flex-grow: 1;
  text-align: center;
  background-color: #f2f2f2;
  margin: 0 4px 12px;
  padding: 0;
  @media (min-width: 768px) {
    flex-grow: 0;
    margin-bottom: 0;
  }

  button {
    padding: 12px 24px;
    color: #585857;
    font-size: 1rem;
    font-weight: 500;
    background: transparent;
    border: 0;
    white-space: nowrap;
  }
  &.active {
    background-color: #96b633;
    button {
      color: #fff !important;
      background: transparent;
    }
  }
`
const TabContentWrapper = styled.div`
  background-color: #fff;
  padding: 0 16px 16px;
`

const defaultTabs = [
  [
    { title: 'Tab 1', content: <div>Tab 1 content</div> },
    { title: 'Tab 2', content: <div>Tab 2 content</div> },
    { title: 'Tab 3', content: <div>Tab 3 content</div> },
  ],
]

export default function Tabs({ tabs = defaultTabs, extra, initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const activeTabContent = () => tabs[activeTab]?.content

  return (
    <>
      <TabBarWrapper>
        <TabList role="tablist">
          {tabs.map(({ title }, index) => (
            <Tab key={index} className={activeTab === index ? 'active' : null}>
              <button
                href="#"
                role="tab"
                onClick={() => {
                  setActiveTab(index)
                }}
              >
                {title}
              </button>
            </Tab>
          ))}
        </TabList>
        {extra}
      </TabBarWrapper>

      <TabContentWrapper>{activeTabContent()}</TabContentWrapper>
    </>
  )
}
