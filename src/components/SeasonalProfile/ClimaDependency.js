import React from 'react'
import styled from 'styled-components'

const DependecyLevels = styled.div`
  display: flex;
  margin-top: 32px;
  background: rgb(150,182,51);
  background: linear-gradient(90deg, rgba(150,182,51,1) 0%, rgba(242,151,15,1) 50%, rgba(97,97,97,1) 100%);
`
const DependecyLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 8px 0;
  text-transform: uppercase;
  flex: 1;
  background-color: transparent;
`

const LevelNull = styled(DependecyLevel)`
  background
`

const LevelLow = styled(DependecyLevel)`

`

const LevelModerate = styled(DependecyLevel)`

`

const LevelHigh = styled(DependecyLevel)`
  background-color: #616161;
`

const ClimaDependency = () => {
  return (
    <DependecyLevels>
      <LevelNull>Nul·la</LevelNull>
      <LevelLow>Baixa</LevelLow>
      <LevelModerate>Moderada</LevelModerate>
      <LevelHigh>Alta</LevelHigh>
    </DependecyLevels>
  )
}

export default ClimaDependency
