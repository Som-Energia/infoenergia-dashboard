import React from 'react'
import styled from 'styled-components'

const ExtraControls = ({ children }) => {

  return (
    <ExtraButtonsWrapper>
      <ul>

        {React.Children.map(children, child => (
          <li>{child}</li>
        ))}
      </ul>
    </ExtraButtonsWrapper>
  )
}
export default ExtraControls

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
