import axios from 'axios'

const investmenAxios = axios.create({})


const response = {
    status: 200,
    state: true,
    headers: {}
}

export const getMockConsumption = async () => {
    return Promise.resolve({
        data: JSON.parse(import.meta.env.VITE_APP_GENERATION_ASSIGNMENTS_USE_TABLE),
        ...response
    })
}

export const getMockKWhRecord = async () => {
    return Promise.resolve({
        data: JSON.parse(import.meta.env.VITE_APP_GENERATION_PRODUCTION_CHART),
        ...response
    })
}

export const getMockKWhRemaining = async () => {
    return Promise.resolve({
        data: JSON.parse(import.meta.env.VITE_APP_GENERATION_BAG_KWH),
        ...response
    })
}

export const getMockLastInvoiceDatePriorityContract = async () => {
    return Promise.resolve({
        data: JSON.parse(import.meta.env.VITE_APP_GENERATION_LAST_INVOICE_DATE),
        ...response
    })
}


const devInvestmentApi = {
    getConsumption: getMockConsumption,
    getkWhRecord: getMockKWhRecord,
    getkWhRemaining: getMockKWhRemaining,
    getLastInvoiceDatePriorityContract: getMockLastInvoiceDatePriorityContract
}


const getConsumption = async (date, token, type) => {
    const urlY = '/api/investments/assignments-consumption-yearly/'
    const urlM = '/api/investments/assignments-consumption-monthly/'

    return investmenAxios({
        method: 'GET',
        url: type === 'month' ? urlM + date.format('YYYY-MM') : urlY + date.year(),
        headers: { Authorization: token, Identifier: "ass_consumption" },
    }).then((response) => {
        return response?.data
    })
}

const getkWhRecord = async (date, token) => {
    return investmenAxios({
        method: 'GET',
        url: '/api/investments/assignments-kwh-rights/' + date.year(),
        headers: { Authorization: token, Identifier: "kwh_rights" },
    }).then((response) => {
        return response?.data
    })
}

const getkWhRemaining = async (token) => {
    return investmenAxios({
        method: 'GET',
        url: '/api/investments/assignments-remaining-kwh-production',
        headers: { Authorization: token, Identifier: "kwh_production" },
    }).then((response) => {
        return response?.data
    }).catch((error) => {
        console.log(error)
        throw error
    })
}

const getLastInvoiceDatePriorityContract = async (token) => {
    return investmenAxios({
        method: 'GET',
        url: '/api/investments/last-invoice-date-from-priority-contract',
        headers: { Authorization: token, Identifier: "last_invoice_date" },
    }).then((response) => {
        return response?.data
    })
}


const prodInvestmentApi = {
    getConsumption: getConsumption,
    getkWhRecord: getkWhRecord,
    getkWhRemaining: getkWhRemaining,
    getLastInvoiceDatePriorityContract: getLastInvoiceDatePriorityContract
}


const getApi = (mode) => {
    if (mode === 'development') {
        return devInvestmentApi
    }
    else {
        return prodInvestmentApi
    }
}

export default { getApi: getApi }