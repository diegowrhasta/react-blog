import React from 'react'

import './ModeButton.css'
import { ModeIcon } from './ModeIcon/ModeIcon'
import { useGlobalStore } from '../../store'

interface ModeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ModeButton ({ onClick }: ModeButtonProps) {
  const mode = useGlobalStore(state => state.mode)

  function onModeChange (event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()

    onClick(event)
  }

  return (
    <button
      aria-label='Mode Button'
      className='mode-button'
      onClick={onModeChange}
    >
      <ModeIcon mode={mode} />
    </button>
  )
}

export { ModeButton }
