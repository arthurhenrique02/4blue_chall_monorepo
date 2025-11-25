import React from 'react'

export default function Input({ value, onChange, placeholder, onKeyDown }) {
  return (
    <input
      className="flex-1 px-3 py-2 border rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  )
}
