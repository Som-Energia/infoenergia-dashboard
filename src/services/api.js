import axios from 'axios'

const { API_BASE_URL } = window.config
//const API_BASE_URL = 'https://heman-demo.somenergia.local:8084/api'
const TOKEN = 'e39c0f1d3aaf4d7cbd572ac49e20b7dc5839bfb217e849dfb7335a3a098b30dc'

const headers = {
  Authorization: `token ${TOKEN}`,
  'Content-Type': 'application/json'
}

export const getDailyProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/dailyprofile/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByPeriod = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/distributionbyperiod/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}

export const getDistributionByTypeOfUse = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/distributionbytypeofuse/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}

export const getWeeklyProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/weeklyprofile/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}

export const getMonthsProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/monthsprofile/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}

export const getSeasonalProfile = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/InfoenergiaReport/data/seasonalprofile/${contract}`,
    headers: headers
  })
    .then(response => {
      return response?.data
    })
}
