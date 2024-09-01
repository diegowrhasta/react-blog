import React, { useEffect } from 'react'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'

import './App.css'
import { updateTitle } from './store'

const defaultTitle = 'THE BLOG'

function App () {
  function onChangeMode (event: React.MouseEvent<HTMLButtonElement>): void {
    console.log('app', event)
  }

  useEffect(() => {
    updateTitle(defaultTitle)
  }, [])

  return (
    <>
      <div className='container'>
        <Header onModeButtonClick={onChangeMode}></Header>
        <Title></Title>
        <main>MAIN</main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  )
}

export default App
