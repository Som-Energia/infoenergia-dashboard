import axios from 'axios'
import investmentsFactApi from './investmentsFactApi'

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

/* Choice development api or production api */
const investmentsApi = investmentsFactApi.getApi(import.meta.env.MODE)
/* Use's table data */
export const getConsumption = async (date, token, type) => investmentsApi.getConsumption(date, token, type)
/* Production's chart data */
export const getkWhRecord = async (date, token) => investmentsApi.getkWhRecord(date, token)
/* Bag's chart data */
export const getkWhRemaining = async (token) => investmentsApi.getkWhRemaining(token)
/* Bag's chart last date */
export const getLastInvoiceDatePriorityContract = async (token) => investmentsApi.getLastInvoiceDatePriorityContract(token)
