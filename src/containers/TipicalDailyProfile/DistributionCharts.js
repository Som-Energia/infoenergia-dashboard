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
`

export const Title = styled.h3`
  font-size: 1.45rem;
  font-weight: 500;
  white-space: wrap;
  margin: 0;
  padding-top: 8px;
  padding-left: 16px;
  padding-bottom: 16px;
  color: #96b633;
  @media (max-width: 768px) {
    padding-left: 0;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-content: center;
`

export const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
export const LegendWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`
export const Widget = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 12px 24px 24px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 16px;
  }
  background-color: #fff;
  border-radius: 0;
`
