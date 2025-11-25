import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import createClient from '../services/api'
import { getToken } from '../services/auth'
import Input from '../components/Input'
import Button from '../components/Button'
import Message from '../components/Message'
import { useToast } from '../components/Toast'

export default function Chat() {
  const [searchParams] = useSearchParams()
  const chatIdParam = searchParams.get('chat_id')
  const [chatId, setChatId] = useState(chatIdParam || null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const token = getToken()
  const client = createClient(token)
  const { addToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    if (chatId) {
      client.get(`/api/chat/history/${chatId}/`).then(r => {
        setMessages(r.data.messages)
      }).catch((err) => {
        console.error(err)
        addToast(err?.message || 'Falha ao carregar histórico', { type: 'error' })
      })
    }
  }, [chatId, token])

  const send = async () => {
    if (!text.trim()) return
    try {
      const payload = { message: text }
      if (chatId) payload.chat_id = chatId
      const r = await client.post('/api/chat/messages/', payload)
      if (r.data.chat_id) setChatId(r.data.chat_id)
      setMessages((prev) => [...prev, ...r.data.messages])
      setText('')
    } catch (err) {
      console.error(err)
      addToast(err?.message || 'Ocorreu algum problema ao enviar. Tente novamente mais tarde', { type: 'error' })
    }
  }

  const newChat = () => {
    setChatId(null)
    setMessages([])
    navigate('/chat', { replace: true })
    addToast('Nova conversa iniciada', { type: 'info' })
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[70vh]">
      <div className="card flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Chat {chatId ? `${chatId}` : '(novo)'}</h2>
        </div>
        <div className="messages flex-1 overflow-auto flex flex-col gap-3">
          {messages.map((m, idx) => <Message key={idx} m={m} />)}
        </div>
        <div className="composer mt-3 flex items-center gap-3">
          <Input value={text} onChange={setText} placeholder="Digite aqui..." onKeyDown={(e)=>{ if(e.key==='Enter') send() }} />

          <Button onClick={send}>Enviar</Button>
          {chatId && (
            <Button className="border-indigo-300 hover:bg-indigo-400" onClick={newChat}>Nova conversa</Button>
          )}
        </div>
      </div>
    </div>
  )
}
