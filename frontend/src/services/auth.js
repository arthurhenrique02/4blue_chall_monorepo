import createClient from './api'

const TOKEN_KEY = 'chat_token'

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function login(username, password) {
  const client = createClient()
  const resp = await client.post('/api/auth/', { username, password })
  return resp.data
}
