import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const LastUpdateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  margin-bottom: 8px;
  span {
    padding-left: 4px;
    font-weight: 500;
  }
`

const LastUpdate = (props) => {
  const { date } = props
  return (
    <LastUpdateWrapper>
      Darrera actualització: <span>{ date ? moment(date).format('DD/MM/YYYY') : '-' }</span>
    </LastUpdateWrapper>
  )
}

export default LastUpdate
