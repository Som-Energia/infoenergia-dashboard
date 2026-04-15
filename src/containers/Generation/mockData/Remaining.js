const buildData = (fromDate, toDate, baseValue = 5) => {
  const result = []
  const current = new Date(fromDate)
  const end = new Date(toDate)

  while (current <= end) {
    result.push({
      date: current.getTime(),
      value: baseValue - Math.round(Math.random()),
    })
    current.setHours(current.getHours() + 1)
  }

  return result
}

const data = buildData('2020-01-01', '2020-01-26', 5)

export default data
