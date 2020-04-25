import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const LastUpdateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  margin-bottom: 8px;
  span {
    padding-left: 4px;
    font-weight: 500;
  }
`

const LastUpdate = (props) => {
  return (
    <LastUpdateWrapper>
      Darrera actualització: <span>{moment().format('DD/MM/YYYY')}</span>
    </LastUpdateWrapper>
  )
}

export default LastUpdate
