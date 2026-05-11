import { memo } from 'react'

import { CurveChart } from '@somenergia/somenergia-ui'

import styled from 'styled-components'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`

function TimeCurvesLineChart({ period, data = [], compareData = [], lang = 'es', displaced }) {
  return (
    <ChartWrapper>
      <CurveChart
        data={data}
        period={period}
        compareData={compareData}
        lang={lang}
        displaced={displaced}
      ></CurveChart>
    </ChartWrapper>
  )
}

export default memo(TimeCurvesLineChart)
