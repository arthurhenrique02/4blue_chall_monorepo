import React from 'react'

export default function Button({ children, onClick, className }) {
  return (
    <button
      className={`
        px-4 py-2 bg-transparent border border-cyan-500 text-black rounded-md hover:bg-blue-400 hover:text-white hover:border-transparent ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
