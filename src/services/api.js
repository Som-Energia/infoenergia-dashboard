import axios from 'axios'

//const { API_BASE_URL } = window.config

const API_BASE_URL = 'https://private-5e721a-proves1.apiary-mock.com'

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

export const getDistributionByUserType = async (contract) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/data/distributionbyusertype/${contract}`
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
