import React, { useEffect, useState } from 'react'
import createClient from '../services/api'
import { getToken } from '../services/auth'

export default function History() {
  const [chats, setChats] = useState([])
  const token = getToken()
  const client = createClient(token)

  useEffect(() => {
    if (!token) return
    client.get('/api/chat/history/').then((r) => setChats(r.data)).catch(console.error)
  }, [token])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Histórico</h2>
        {chats.length === 0 ? <p>Não há nehum chat, por enquanto</p> : (
          <ul className="divide-y divide-gray-200">
            {chats.map(c => (
              <li key={c.id} className="py-3 hover:scale-101 duration-190 ease-in">
                <a className="text-black duration-180 ease-in hover:text-blue-700" href={`/chat?chat_id=${c.id}`}>Chat {c.id} — {new Date(c.timestamp).toLocaleString()}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
