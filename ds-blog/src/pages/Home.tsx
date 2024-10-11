import { useEffect } from 'react'

import { EntrySection } from '../components/EntrySection/EntrySection'

import * as entriesUtils from '../utils/entries'
import { useAllEntriesStore, useGlobalStore } from '../store'
import './Home.css'
import { EntryInterface } from '../data'

const homeTitle = 'THE BLOG'

function Home () {
  const setTitle = useGlobalStore(state => state.setTitle)

  const calculatingNewPage = useAllEntriesStore(
    state => state.calculatingNewPage
  )
  const currentPage = useAllEntriesStore(state => state.currentPage)
  const currentPageEntries = useAllEntriesStore(
    state => state.currentPageEntries
  )
  const allEntries = useAllEntriesStore(state => state.allEntries)
  const updateCurrentPageState = useAllEntriesStore(
    state => state.updateCurrentPageState
  )

  useEffect(() => {
    setTitle(homeTitle)
  }, [setTitle])

  useEffect(() => {
    if (!calculatingNewPage) {
      return
    }

    const newCurrentPageEntries = entriesUtils.getPageEntries(
      allEntries,
      currentPage
    )
    updateCurrentPageState(newCurrentPageEntries, currentPage)
  }, [calculatingNewPage, allEntries, currentPage, updateCurrentPageState])

  function getRecentEntries (entries: EntryInterface[]) {
    return entriesUtils.calculateRecentEntries(entries)
  }

  return (
    <>
      <EntrySection
        id='recent'
        data={getRecentEntries(allEntries)}
        titleName='Recent blog posts'
      ></EntrySection>
      <EntrySection
        id='all'
        data={currentPageEntries}
        pageNumber={entriesUtils.getPageNumber(allEntries.length)}
        pageSize={entriesUtils.PAGINATOR_CONFIG.pageSize}
        titleName='All blog posts'
        isAllType
      ></EntrySection>
    </>
  )
}

export { Home }
