import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    flex-direction: row;
  }
  margin-bottom: 8px;
`

export const Title = styled.h3`
  font-size: 1.45rem;
  font-weight: 500;
  white-space: wrap;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: 20px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
`

export const ChartWrapper = styled.div`
  width: 100%;
  align-self: center;
  @media (min-width: 768px) {
    align-self: flex-end;
  }
  flex-grow: 1;
`

export const NoDataMessage = styled.h3`
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`
