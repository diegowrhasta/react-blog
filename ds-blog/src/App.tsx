import React, { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Title } from './components/Title'
import { Footer } from './components/Footer'
import { EntrySection } from './components/EntrySection/EntrySection'

import './App.css'
import * as entriesUtils from './utils/entries'
import { getMockData } from './data/blog-entries'
import {
  allEntriesStore,
  updateAllEntriesStore,
  updateCurrentPageState,
  updateTitle
} from './store'
import { tap } from 'rxjs'
import { EntryInterface } from './data'

const defaultTitle = 'THE BLOG'

function App () {
  const [entryData] = useState(getMockData()!.sortEntries())
  const [currentPageEntries, setCurrentPageEntries] = useState(
    entriesUtils.getPageEntries(entryData, 1)
  )
  useState(() => {
    updateAllEntriesStore(entryData, currentPageEntries, 1)
    return 1
  })
  const [store$] = useState(
    allEntriesStore
      .pipe(
        tap(state => {
          if (state.calculatingNewPage) {
            const newCurrentPageEntries = entriesUtils.getPageEntries(
              entryData,
              state.currentPage!
            )
            setCurrentPageEntries(newCurrentPageEntries)
            updateCurrentPageState(newCurrentPageEntries, state.currentPage!)
          }
        })
      )
      .subscribe()
  )

  useEffect(() => {
    updateTitle(defaultTitle)
    return () => {
      store$.unsubscribe()
    }
  }, [store$])

  function onChangeMode (event: React.MouseEvent<HTMLButtonElement>): void {
    console.log('app', event)
  }

  return (
    <div className='container'>
      <Header onModeButtonClick={onChangeMode}></Header>
      <Title></Title>
      <main>
        <EntrySection
          id='recent'
          data={getRecentEntries(entryData)}
          titleName='Recent blog posts'
        ></EntrySection>
        <EntrySection
          id='all'
          data={currentPageEntries}
          pageNumber={entriesUtils.getPageNumber(entryData.length)}
          pageSize={entriesUtils.PAGINATOR_CONFIG.pageSize}
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

function getRecentEntries (entries: EntryInterface[]) {
  return entriesUtils.calculateRecentEntries(entries)
}

export default App
