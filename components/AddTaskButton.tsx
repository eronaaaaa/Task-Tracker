//this component needs use client because it uses useState, which is a React hook that can only be used in client components.
//the button also has an onClick handler that updates the state, which requires client-side interactivity.

'use client'

import { useState } from 'react'
import { Button } from '@mui/material'

export default function AddTaskButton() {
  const [clicked, setClicked] = useState(false)

  return (
    <Button
      variant="contained"
      onClick={() => setClicked(!clicked)}
      size="small"
    >
      {clicked ? 'Coming soon...' : '+ Add task'}
    </Button>
  )
}