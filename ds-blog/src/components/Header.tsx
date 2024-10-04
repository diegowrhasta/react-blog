import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ModeButton } from './ModeButton/ModeButton'

import './Header.css'
import { useGlobalStore } from '../store'
import { modeType } from '../store/types'

interface HeaderProps {
  onModeButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface OverlayMenuProps extends HeaderProps {
  showOverlayClick: (directValue?: boolean) => void
}

function HamburgerButton ({
  onShowOverlayClick,
  mode
}: {
  onShowOverlayClick(directValue?: boolean): void
  mode: modeType
}) {
  function calculateHamburgerColor (color: modeType) {
    return color === 'light' ? '#1A1A1A' : '#FFFFFF'
  }

  return (
    <button onClick={() => onShowOverlayClick()} id='hamburger'>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill={calculateHamburgerColor(mode)}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M26.7333 14.667H5.26667C4.56711 14.667 4 15.2341 4 15.9337V16.067C4 16.7666 4.56711 17.3337 5.26667 17.3337H26.7333C27.4329 17.3337 28 16.7666 28 16.067V15.9337C28 15.2341 27.4329 14.667 26.7333 14.667Z' />
        <path d='M26.7333 21.333H5.26667C4.56711 21.333 4 21.9001 4 22.5997V22.733C4 23.4326 4.56711 23.9997 5.26667 23.9997H26.7333C27.4329 23.9997 28 23.4326 28 22.733V22.5997C28 21.9001 27.4329 21.333 26.7333 21.333Z' />
        <path d='M26.7333 8H5.26667C4.56711 8 4 8.56711 4 9.26667V9.4C4 10.0996 4.56711 10.6667 5.26667 10.6667H26.7333C27.4329 10.6667 28 10.0996 28 9.4V9.26667C28 8.56711 27.4329 8 26.7333 8Z' />
      </svg>
    </button>
  )
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
  const mode = useGlobalStore(state => state.mode)

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
        <HamburgerButton mode={mode} onShowOverlayClick={onShowOverlayClick} />
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
