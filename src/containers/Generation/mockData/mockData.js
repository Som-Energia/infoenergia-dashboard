const buildData = (fromDate, toDate) => {
  const result = {}
  const current = new Date(fromDate)
  const end = new Date(toDate)

  const pad = (n) => String(n).padStart(2, '0')

  while (current <= end) {
    const dateStr = `${current.getFullYear()}-${pad(current.getMonth() + 1)}-${pad(current.getDate())}`

    for (let hour = 0; hour < 24; hour++) {
      const key = `${dateStr} ${pad(hour)}:00:00`
      const isSolarHour = hour >= 10 && hour <= 15
      result[key] = isSolarHour ? Math.floor(Math.random() * 3) * -1 : 0
    }

    current.setDate(current.getDate() + 1)
  }

  return result
}

const data = buildData('2022-01-15', '2023-10-15')

export default data
