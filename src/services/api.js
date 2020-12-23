import axios from 'axios'

// const { API_BASE_URL } = window.config
// const API_BASE_URL = 'https://private-5e721a-proves1.apiary-mock.com'
const API_BASE_URL = 'https://heman-demo.somenergia.local:8084/api'
const TOKEN = 'e39c0f1d3aaf4d7cbd572ac49e20b7dc5839bfb217e849dfb7335a3a098b30dc'

const headers = {
  Authorization: `token ${TOKEN}`,
  'Content-Type': 'application/json'
}

export const getDailyProfile = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/dailyprofile/${contract}`
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.dailyTypicalProfileLast12Months
    })
}

export const getDistributionByPeriod = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/distributionbyperiod/${contract}`
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.distributionByPeriods
    })
}

export const getDistributionByTypeOfUse = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/distributionbytypeofuse/${contract}`,
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.distributionByTypeOfUse
    })
}

export const getWeeklyProfile = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/weeklyprofile/${contract}`,
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.weeklyAvgConsumeLast12Months
    })
}

export const getMonthsProfile = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/monthsprofile/${contract}`,
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.last3MonthsProfile
    })
}

export const getSeasonalProfile = async (contract) => {
  return axios({
    method: 'GET',
    // url: `${API_BASE_URL}/data/seasonalprofile/${contract}`,
    url: `${API_BASE_URL}/InfoenergiaReport/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data[0][1]?.results.seasonalProfile
    })
}

export const getContracts = async () => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/contracts`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}
