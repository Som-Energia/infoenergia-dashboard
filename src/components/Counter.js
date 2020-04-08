import React from 'react'
import styled from 'styled-components'

const CounterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CounterBox = styled.div`
    padding: 0 4px;
    margin-bottom: 20px;
    background-color: #96b633;
    color: #fff;
    display: flex;
    align-items: center;
`

const CounterValue = styled.div`
    font-size: 3rem;
    font-weight: bold;
    padding: 4px;
`

const CounterDetail = styled.div`
    font-size: 1.35rem;
    font-weight: bold;
    padding: 0 4px 0 8px;
    .title {
      color: #616161;
    }
`

function Counter(props) {
  const { value, title, date } = props

  const diffDates = (date1, date2) => {
    return '12 mesos'
  }

  return (
    <CounterWrapper className="col-xs-12">
      <CounterBox>
        <CounterValue>
          {value} kWh
        </CounterValue>
        <CounterDetail>
          <div className="title">{title}</div>
          <div>Últims {diffDates(date)}</div>
        </CounterDetail>
      </CounterBox>
    </CounterWrapper>
  )
}

export default Counter
