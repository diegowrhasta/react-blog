import React from 'react'
import { Link } from 'react-router-dom'

import { ModeButton } from './ModeButton'

import './Header.css'

interface HeaderProps {
  onModeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Header ({ onModeButtonClick }: HeaderProps) {
  function onModeClick (event: React.MouseEvent<HTMLButtonElement>) {
    onModeButtonClick(event)
  }

  return (
    <header>
      <div className='header-container'>
        <h3>Diego Balderrama</h3>
        <nav>
          <Link to={'/'}>Home</Link>
          <a href='#recent'>Recent</a>
          <a href='#all'>All</a>
          <Link to={'about'}>About</Link>
          <ModeButton onClick={onModeClick} />
        </nav>
      </div>
    </header>
  )
}
