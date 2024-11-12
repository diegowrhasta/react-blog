import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BlogEntry } from './pages/BlogEntry/BlogEntry'

import './App.css'
import { useGlobalStore } from './store'
import { useEffect } from 'react'
import * as scrollUtils from './utils/scroll'
import { EntriesGuard } from './router/entries.guard'

function App () {
  const setScrollToBottom = useGlobalStore(state => state.setScrollToBottom)
  const scrollToBottom = useGlobalStore(state => state.scrollToBottom)
  const setMode = useGlobalStore(state => state.setMode)

  useEffect(() => {
    if (scrollToBottom) {
      scrollUtils.onContentUpdate()
      setScrollToBottom(false)
    }
  }, [scrollToBottom, setScrollToBottom])

  function onChangeMode (): void {
    document.body.classList.toggle('dark-theme')

    const newMode = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light'

    setMode(newMode)
  }

  return (
    <Router>
      <div className='container'>
        <Header onModeButtonClick={onChangeMode}></Header>
        <Title></Title>
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <EntriesGuard>
                  <Home />
                </EntriesGuard>
              }
            />
            <Route path='/about' element={<About />} />
            <Route
              path='/entry/:id'
              element={
                <EntriesGuard>
                  <BlogEntry />
                </EntriesGuard>
              }
            />
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </Router>
  )
}

export { App }
