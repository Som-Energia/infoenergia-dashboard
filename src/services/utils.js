
export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const formatkWh = (item) => {
  return formatNumber(Math.round(item)) + ' kWh'
}

export const formatPerc = (item) => {
  return Math.round(item) + '%'
}

export const formatEuros = (item) => {
  return (item + '€').replace('.', ',')
}
