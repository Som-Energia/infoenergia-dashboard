import React from 'react'
import styled from 'styled-components'

const CounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CounterBox = styled.div`
  border-color: ${(props) =>
    props.color === 'primary' ? '#96b633' : '#f2970f'};
  border-width: 0px;
  border-radius: 8px;
  border-style: solid;
  padding: 4px 8px;
  color: ${(props) => (props.color === 'primary' ? '#96b633' : '#f2970f')};
  display: flex;
  align-items: center;
`

const CounterValue = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  padding: 0 4px;
  white-space: nowrap;
  span:last-child {
    font-weight: 400;
    font-size: 2rem;
  }
`

const CounterDetail = styled.div`
  font-size: 1rem;
  font-weight: 500;
  padding: 0 4px 0 8px;
  line-height: 1.2rem;
  .title {
    color: #616161;
  }
  div {
    white-space: nowrap;
  }
`

function Counter(props) {
  const { value, title, date = '', color = 'primary' } = props
  const dateLabel = date === '' ? '' : date
  return (
    <CounterWrapper>
      <CounterBox color={color}>
        <CounterValue>
          <span>{value !== '-' ? value : '-'}</span>
          <span> kWh</span>
        </CounterValue>
        <CounterDetail>
          <div className="title">{title}</div>
          <div>{dateLabel}</div>
        </CounterDetail>
      </CounterBox>
    </CounterWrapper>
  )
}

export default Counter
