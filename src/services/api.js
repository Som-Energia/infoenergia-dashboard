import axios from 'axios'

// const { API_BASE_URL } = window.config
// const API_BASE_URL = 'https://private-5e721a-proves1.apiary-mock.com'
const API_BASE_URL = 'http://localhost:9999'

export const getDailyProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/dailyprofile/${contract}`
  })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByPeriod = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/distributionbyperiod/${contract}`
  })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByTypeOfUse = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/distributionbytypeofuse/${contract}`
  })
    .then(response => {
      return response?.data
    })
}

export const getWeeklyProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/weeklyprofile/${contract}`
  })
    .then(response => {
      return response?.data
    })
}

export const getMonthsProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/monthsprofile/${contract}`
  })
    .then(response => {
      return response?.data
    })
}

export const getSeasonalProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/seasonalprofile/${contract}`
  })
    .then(response => {
      return response?.data
    })
}
