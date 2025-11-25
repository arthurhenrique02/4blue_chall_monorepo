import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import History from './pages/History'
import Navbar from './components/Navbar'
import { getToken } from './services/auth'

function BaseLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="w-full">{children}</main>
    </div>
  )
}

export default function App() {
  const ProtectedRoute = ({ children }) => {
    const token = getToken()
    if (!token) return <Navigate to="/" replace />
    return children
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<ProtectedRoute><BaseLayout><Navbar /><Chat /></BaseLayout></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><BaseLayout><Navbar /><History /></BaseLayout></ProtectedRoute>} />
    </Routes>
  )
}
