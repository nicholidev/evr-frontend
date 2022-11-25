import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_ENDPOINT,
})

// Blocks 
export const blocksApi = async () => api.get('/evr/blocks')
export const validBlocksApi = async() => api.get('/evr')
export const luckApi = async () => api.get('/evr/statistics')

// Dashboard
export const allMinersApi = async () => api.get('/evr/miners')
export const activeMinersApi = async () => api.get('/evr/miners?method=active')
export const workersApi = async (w: string) => api.get(`/evr/workers/?method=${w}`)
export const minersApi = async (w: string) => api.get(`/evr/miners/?method=${w}`)

// Statistic
export const statisticApi = async () => api.get('/evr/statistics')
export const historicalApi = async () =>api.get('/evr/historical')

// Payments
export const paymentsApi = async () => api.get('/evr/payments?method=records')