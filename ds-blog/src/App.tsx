import React, { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'
import { EntrySection } from './components/EntrySection/EntrySection'

import './App.css'
import * as entriesUtils from './utils/entries'
import { ENTRY_DATA } from './data/blog-entries'
import { updateTitle } from './store'

const defaultTitle = 'THE BLOG'

function App () {
  const [recentEntries] = useState(
    entriesUtils.calculateRecentEntries(ENTRY_DATA)
  )

  useEffect(() => {
    updateTitle(defaultTitle)
  }, [])

  function onChangeMode (event: React.MouseEvent<HTMLButtonElement>): void {
    console.log('app', event)
  }

  return (
    <div className='container'>
      <Header onModeButtonClick={onChangeMode}></Header>
      <Title></Title>
      <main>
        <EntrySection
          data={recentEntries}
          titleName='Recent blog posts'
        ></EntrySection>
        <EntrySection
          data={ENTRY_DATA}
          titleName='All blog posts'
          isAllType
        ></EntrySection>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default App
