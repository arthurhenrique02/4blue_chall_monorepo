import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToken, logout } from '../services/auth'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate()
  const token = getToken()

  return (
    <header className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Link to="/chat" className="flex items-center">
          <img src={logo} alt="Assist. Bluezinho" className="h-16 w-auto" />
        </Link>
        {token ? (
          <>
            <Link to="/chat" className="text-blue-600">Chat</Link>
            <Link to="/history" className="text-blue-600">Minhas conversas</Link>
          </>
        ) : null}
      </div>
      <div>
        {token ? (
          <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => { logout(); navigate('/') }}>Logout</button>
        ) : null}
      </div>
    </header>
  )
}
