import { memo } from 'react'
import styled from 'styled-components'
import { CurveChart } from '@somenergia/somenergia-ui'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

function TimeCurvesLineChart({ period, data = [], compareData = [], lang = 'es' }) {
  return (
    <ChartWrapper>
      <CurveChart
        data={data}
        period={period}
        compareData={compareData}
        lang={lang}></CurveChart>
    </ChartWrapper>
  )
}

export default memo(TimeCurvesLineChart)
