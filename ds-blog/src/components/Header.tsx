import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ModeButton } from './ModeButton/ModeButton'

import './Header.css'

interface HeaderProps {
  onModeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface OverlayMenuProps extends HeaderProps {
  showOverlayClick: (directValue?: boolean) => void
}

function OverlayMenu ({
  onModeButtonClick,
  showOverlayClick
}: OverlayMenuProps) {
  function onCloseOverlay (event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation()

    const target = event.target as HTMLElement
    const directParent = target.parentElement

    if (directParent && directParent.matches('.overlay-menu')) {
      showOverlayClick(false)
    }
  }

  return (
    <div onClick={onCloseOverlay} className='overlay-menu'>
      <h3>Diego Balderrama</h3>
      <Link to={'/'}>Home</Link>
      <a href='#recent'>Recent</a>
      <a href='#all'>All</a>
      <Link to={'about'}>About</Link>
      <ModeButton onClick={onModeButtonClick} />
      <h2 className='close-overlay'>X</h2>
    </div>
  )
}

function Header ({ onModeButtonClick }: HeaderProps) {
  const [showOverlayMenu, setShowOverlayMenu] = useState(false)
  function onModeClick (event: React.MouseEvent<HTMLButtonElement>) {
    onModeButtonClick(event)
  }

  function onShowOverlayClick (directValue?: boolean) {
    const willShowOverlay = directValue ?? !showOverlayMenu

    if (willShowOverlay) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    setShowOverlayMenu(!showOverlayMenu)
  }

  return (
    <header>
      <div className='header-container'>
        <h3>Diego Balderrama</h3>
        <nav id='extended'>
          <Link to={'/'}>Home</Link>
          <a href='#recent'>Recent</a>
          <a href='#all'>All</a>
          <Link to={'about'}>About</Link>
          <ModeButton onClick={onModeClick} />
        </nav>
        <button onClick={() => onShowOverlayClick()} id='hamburger'>
          BROTHER
        </button>
        {showOverlayMenu && (
          <OverlayMenu
            showOverlayClick={onShowOverlayClick}
            onModeButtonClick={onModeButtonClick}
          />
        )}
      </div>
    </header>
  )
}

export { Header }
