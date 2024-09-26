import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BlogEntry } from './pages/BlogEntry/BlogEntry'

import './App.css'

function App () {
  function onChangeMode (): void {
    document.body.classList.toggle('dark-theme')
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
            <Route path='/entry/:id' element={<BlogEntry />} />
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
