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
