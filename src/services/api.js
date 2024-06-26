import axios from 'axios'

const HEMAN_API_URL = document.getElementById('root')
  ? document.getElementById('root').dataset.hemanApiUrl
  : null // For tests

const API_PREFIX = 'InfoenergiaReport/data'

export const getDailyProfile = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/dailyprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getDistributionByPeriod = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/distributionbyperiod/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getDistributionByTypeOfUse = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/distributionbytypeofuse/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getWeeklyProfile = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/weeklyprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getMonthsProfile = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/monthsprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getSeasonalProfile = async (contract, token) => {
  const url = `${HEMAN_API_URL}/${API_PREFIX}/seasonalprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getConsumption = async (date, token, type) => {
  const urlY = '/api/investments/assignments-consumption-yearly/'
  const urlM = '/api/investments/assignments-consumption-monthly/'

  return axios({
    method: 'GET',
    url: type === 'month' ? urlM + date.format('YYYY-MM') : urlY +  date.year(),
    headers: { Authorization: token },
  }).then((response) => {
    return response?.data
  })
}

export const getkWhRecord = async (date, token) => {
  return axios({
    method: 'GET',
    url: '/api/investments/assignments-kwh-rights/'+date.year(),
    headers: { Authorization: token },
  }).then((response) => {
    return response?.data
  })
}

export const getkWhRemaining = async (token) => {
  return axios({
    method: 'GET',
    url: '/api/investments/assignments-remaining-kwh-production',
    headers: { Authorization: token },
  }).then((response) => {
    return response?.data
  }).catch((error) => {
    console.log(error)
    throw error
  })
}

export const getLastInvoiceDatePriorityContract = async (token) => {
  return axios({
    method: 'GET',
    url: '/api/investments/last-invoice-date-from-priority-contract',
    headers: { Authorization: token },
  }).then((response) => {
    return response?.data
  })
}
