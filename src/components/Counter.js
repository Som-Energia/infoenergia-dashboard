import React from 'react'
import styled from 'styled-components'

import { formatkWhDecimal } from '../services/utils'

const CounterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CounterBox = styled.div`
    padding: 0 8px;
    margin-bottom: 16px;
    background-color: ${props =>
      props.color === 'primary' ? '#96b633' : '#f2970f'
    };
    color: #fff;
    display: flex;
    align-items: center;
`

const CounterValue = styled.div`
    font-size: 2.2rem;
    font-weight: bold;
    padding: 0 4px;
    white-space: nowrap;
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

function Counter (props) {
  const { value, title, date = '', color = 'primary' } = props
  const dateLabel = (date === '') ? '' : date

  return (
    <CounterWrapper>
      <CounterBox color={color}>
        <CounterValue>
          {value !== '-' ? formatkWhDecimal(value) : '- kWh'}
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
