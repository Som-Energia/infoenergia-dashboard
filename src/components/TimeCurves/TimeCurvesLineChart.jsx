import { memo } from 'react'

import { CurveChart } from '@somenergia/somenergia-ui'

import styled from 'styled-components'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

function TimeCurvesLineChart({
  period,
  data = [],
  compareData = [],
  lang = 'es',
}) {
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
