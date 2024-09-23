import { useEffect, useState } from 'react'
import { tap } from 'rxjs'

import { EntrySection } from '../components/EntrySection/EntrySection'

import * as entriesUtils from '../utils/entries'
import { getMockData } from '../data/blog-entries'
import {
  allEntriesStore,
  updateAllEntriesStore,
  updateCurrentPageState,
  useTitleStore
} from '../store'
import './Home.css'
import { EntryInterface } from '../data'

const homeTitle = 'THE BLOG'

function Home () {
  const setTitle = useTitleStore(state => state.setTitle)
  const [entryData] = useState(getMockData()!.sortEntriesDesc())
  const [currentPageEntries, setCurrentPageEntries] = useState(
    entriesUtils.getPageEntries(entryData, 1)
  )

  useEffect(() => {
    setTitle(homeTitle)
  }, [setTitle])

  useState(() => {
    updateAllEntriesStore(entryData, currentPageEntries, 1)
    return 1
  })

  useState(
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

  return (
    <>
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
    </>
  )
}

function getRecentEntries (entries: EntryInterface[]) {
  return entriesUtils.calculateRecentEntries(entries)
}

export { Home }
