import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export function createClient(token) {
  const client = axios.create({ baseURL: API_BASE })
  if (token) client.defaults.headers.common['Authorization'] = `Token ${token}`
  return client
}

export default createClient
