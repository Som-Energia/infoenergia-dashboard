
export const formatkWh = (item) => {
  return Math.round(item) + ' kWh'
}

export const formatPerc = (item) => {
  return Math.round(item) + '%'
}

export const formatEuros = (item) => {
  return (item + '€').replace('.', ',')
}
