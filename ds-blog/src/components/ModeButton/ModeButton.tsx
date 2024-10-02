import React, { useState } from 'react'

import './ModeButton.css'
import { ModeIcon } from './ModeIcon/ModeIcon'

interface ModeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ModeButton ({ onClick }: ModeButtonProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const calculateDarkMode = (isDarkMode: boolean) => {
    return isDarkMode ? 'dark' : 'light'
  }

  function onModeChange (event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()

    setIsDarkMode(!isDarkMode)
    onClick(event)
  }

  return (
    <button className='mode-button' onClick={onModeChange}>
      <ModeIcon mode={calculateDarkMode(isDarkMode)} />
    </button>
  )
}

export { ModeButton }
