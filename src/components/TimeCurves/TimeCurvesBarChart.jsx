import { memo, useMemo } from 'react'
import styled from 'styled-components'
import { SummaryPeriodChart } from '@somenergia/somenergia-ui'
import { groupDataByPeriod, getBaseKeys } from '../../services/utils'
import { period2Color } from '../../services/utils'

const ChartWrapper = styled.div`
  height: 450px;
  margin-top: 16px;
`
function transformBardata(data, tariffTimetableId) {
  const base = getBaseKeys(tariffTimetableId)
  const keys = Object.keys(base)
  let periods = []

  data.forEach((item) => {
    keys.forEach((key) => {
      item[key] = Math.round((item[key] + Number.EPSILON) * 1000) / 1000
    })
    periods.push(item)
  })

  return {
    fills: {
      VALLEY: period2Color['VALLEY'],
      PICK: period2Color['PICK'],
      FLAT: period2Color['FLAT'],
    },
    keys: keys,
    periods: periods,
  }
}

function TimeCurvesBarChart({ period, data = [], compareData = [], lang = 'es', tariffTimetableId }) {
  const groupedData = useMemo(
    () => groupDataByPeriod(data, period, 'barChart', tariffTimetableId),
    [data, period]
  )
  const bardata = transformBardata(groupedData, tariffTimetableId)

  return (
    <ChartWrapper>
      <SummaryPeriodChart
        data={bardata}
        period={period}
        compareData={compareData}
        lang={lang}
        showTooltipKeys={false}>
      </SummaryPeriodChart>
    </ChartWrapper>
  )
}

export default memo(TimeCurvesBarChart)
