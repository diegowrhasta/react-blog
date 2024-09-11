import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'

import './App.css'
import { updateTitle } from './store'

const defaultTitle = 'THE BLOG'

function App () {
  useEffect(() => {
    updateTitle(defaultTitle)
  }, [])

  function onChangeMode (event: React.MouseEvent<HTMLButtonElement>): void {
    console.log('app', event)
  }

  return (
    <Router>
      <div className='container'>
        <Header onModeButtonClick={onChangeMode}></Header>
        <Title></Title>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </Router>
  )
}

export default App
