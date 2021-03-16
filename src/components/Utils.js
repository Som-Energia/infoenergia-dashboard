import styled from 'styled-components'

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  &&::-webkit-scrollbar {
    display: none;
  }
`

export const ScrollWrapper = styled.div`
  min-width: 700px;
`
