import React from 'react'
import Button from '../components/Button'
import { login, saveToken } from '../services/auth'
import { useToast } from '../components/Toast'

export default function Login() {
  const { addToast } = useToast()
  const handleSelect = async (user) => {
    const username = import.meta.env[`VITE_${user}_USERNAME`]
    const password = import.meta.env[`VITE_${user}_PASSWORD`]
    try {
      const data = await login(username, password)
      if (data && data.token) {
        saveToken(data.token)
        window.location.href = '/chat'
      } else {
        addToast('Login failed', { type: 'error' })
      }
    } catch (err) {
      console.error(err)
      addToast(err?.response.data.error || 'Login error', { type: 'error' })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card text-center">
        <h2 className="text-xl font-semibold mb-2">Login</h2>
        <p className="mb-4">Escolha um usuário para fazer login:</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => handleSelect('ARTHUR')}>Arthur</Button>
          <Button onClick={() => handleSelect('RAYSSA')}>Rayssa</Button>
        </div>
      </div>
    </div>
  )
}
