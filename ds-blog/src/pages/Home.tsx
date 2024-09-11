import { useEffect, useState } from 'react'
import { tap } from 'rxjs'

import { EntrySection } from '../components/EntrySection/EntrySection'

import * as entriesUtils from '../utils/entries'
import { getMockData } from '../data/blog-entries'
import {
  allEntriesStore,
  updateAllEntriesStore,
  updateCurrentPageState
} from '../store'
import './Home.css'
import { EntryInterface } from '../data'

function Home () {
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
    return () => {
      store$.unsubscribe()
    }
  }, [store$])

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
