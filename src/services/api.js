import axios from 'axios'

const { API_BASE_URL } = window.config

export const getDailyProfile = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/dailyprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByPeriod = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/distributionbyperiod/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByTypeOfUse = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/distributionbytypeofuse/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}

export const getWeeklyProfile = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/weeklyprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}

export const getMonthsProfile = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/monthsprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}

export const getSeasonalProfile = async (contract, token) => {
  const url = `${API_BASE_URL}/InfoenergiaReport/data/seasonalprofile/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json'
  }

  return axios({ method: 'GET', url, headers })
    .then(response => {
      return response?.data
    })
}
