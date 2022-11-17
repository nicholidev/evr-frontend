import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_ENDPOINT,
})

// Blocks 
export const blocksApi = async () => api.get('/EVR/blocks')
export const validBlocksApi = async() => api.get('/EVR')
export const luckApi = async () => api.get('/EVR/statistics')

// Dashboard
export const allMinersApi = async () => api.get('/EVR/miners')
export const activeMinersApi = async () => api.get('/EVR/miners?method=active')
export const workersApi = async (w: string) => api.get(`/EVR/workers/?method=${w}`)
export const minersApi = async (w: string) => api.get(`/EVR/miners/?method=${w}`)

// Statistic
export const statisticApi = async () => api.get('/EVR/statistics')
export const historicalApi = async () =>api.get('/EVR/historical')

// Payments
export const paymentsApi = async () => api.get('/EVR/payments?method=records')