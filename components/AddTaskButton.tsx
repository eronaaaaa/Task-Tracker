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