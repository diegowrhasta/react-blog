import { useEffect, useState } from 'react'

import { EntrySection } from '../components/EntrySection/EntrySection'

import * as entriesUtils from '../utils/entries'
import { getMockData } from '../data/blog-entries'
import { useAllEntriesStore, useTitleStore } from '../store'
import './Home.css'
import { EntryInterface } from '../data'

const homeTitle = 'THE BLOG'

function Home () {
  const setTitle = useTitleStore(state => state.setTitle)

  const calculatingNewPage = useAllEntriesStore(
    state => state.calculatingNewPage
  )
  const currentPage = useAllEntriesStore(state => state.currentPage)
  const updateAllEntries = useAllEntriesStore(state => state.updateAllEntries)
  const updateCurrentPageState = useAllEntriesStore(
    state => state.updateCurrentPageState
  )

  const [entryData] = useState(getMockData()!.sortEntriesDesc())
  const [currentPageEntries, setCurrentPageEntries] = useState(
    entriesUtils.getPageEntries(entryData, 1)
  )

  useEffect(() => {
    setTitle(homeTitle)
  }, [setTitle])

  useEffect(() => {
    updateAllEntries(entryData, currentPageEntries, 1)
  }, [updateAllEntries, entryData, currentPageEntries])

  useEffect(() => {
    if (!calculatingNewPage) {
      return
    }

    const newCurrentPageEntries = entriesUtils.getPageEntries(
      entryData,
      currentPage!
    )
    setCurrentPageEntries(newCurrentPageEntries)
    updateCurrentPageState(newCurrentPageEntries, currentPage!)
  }, [calculatingNewPage, entryData, currentPage, updateCurrentPageState])

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
