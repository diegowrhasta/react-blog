import React from 'react'

import { Header } from './components/Header'

import './App.css'

function App () {
  function onChangeMode (event: React.MouseEvent<HTMLButtonElement>): void {
    console.log('app', event)
  }

  return (
    <>
      <div className='container'>
        <Header onModeButtonClick={onChangeMode}></Header>
        <main>MAIN</main>
        <footer>FOOTER</footer>
      </div>
    </>
  )
}

export default App
