import React from 'react'

export default function Message({ m }) {
  const isUser = m.sender === 'U'
  return (
    <div className={`max-w-[70%] ${isUser ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-100 text-gray-900'} p-3 rounded-lg`}>
      <div className="message-content">{m.content}</div>
      <div className="text-xs text-gray-400 mt-1">{new Date(m.timestamp).toLocaleString()}</div>
    </div>
  )
}
