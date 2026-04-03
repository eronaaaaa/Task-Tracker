'use client'

//this component needs use client because it uses useState, which is a React hook that can only be used in client components.
//the button also has an onClick handler that updates the state, which requires client-side interactivity.

import { useState } from 'react'

export default function AddTaskButton() {
  const [clicked, setClicked] = useState(false)

  return (
    <button
      onClick={() => setClicked(!clicked)}
      style={{
        padding: '0.5rem 1rem',
        background: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.875rem',
        cursor: 'pointer'
      }}
    >
      {clicked ? 'Coming soon...' : '+ Add task'}
    </button>
  )
}