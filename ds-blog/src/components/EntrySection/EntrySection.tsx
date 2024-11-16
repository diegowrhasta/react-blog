import { Entry } from './Entry/Entry'
import { Paginator } from './Paginator/Paginator'

import { EntryInterface } from '../../data'
import './EntrySection.css'
import { ENTRY_TYPES } from '../../constants'

interface EntrySectionProps {
  id: string
  titleName: string | undefined
  isAllType?: boolean
  pageNumber?: number
  data: EntryInterface[]
}

function EntrySection ({
  titleName,
  isAllType,
  pageNumber,
  data,
  id
}: EntrySectionProps) {
  const allType = !!isAllType

  const container = allType ? getAllLayout(data) : getRecentLayout(data)
  const sectionId = allType ? 'all-region' : 'recent-region'

  function getAllLayout (entries: EntryInterface[]) {
    const genericEntries = entries.map(entry => {
      return <Entry key={entry.id} {...entry} />
    })

    return (
      <div
        role='list'
        aria-label='All Entries List'
        className='entry-container all-container'
      >
        {genericEntries}
      </div>
    )
  }

  function getRecentLayout (entries: EntryInterface[]) {
    const phoneWindow = window.matchMedia('(max-width: 390px)')
    const ipadWindow = window.matchMedia('(max-width: 834px)')

    const layoutElements = getLayoutContents(phoneWindow, ipadWindow, entries)

    let containerClass = ''
    if (phoneWindow.matches) {
      containerClass = 'recent-mobile-container'
    } else if (ipadWindow.matches) {
      containerClass = 'recent-ipad-container'
    } else {
      containerClass = 'recent-desktop-container'
    }

    return (
      <div
        role='list'
        aria-label='Recent Entries List'
        className={`entry-container ${containerClass}`}
      >
        {layoutElements}
      </div>
    )
  }

  function getLayoutContents (
    phoneWindow: MediaQueryList,
    ipadWindow: MediaQueryList,
    entries: EntryInterface[]
  ) {
    if (entries.length < 4) {
      return <></>
    } else if (phoneWindow.matches) {
      return (
        <>
          <Entry type={getRecentEntryType(0)} {...entries[0]} />
          <Entry type={getRecentEntryType(1)} {...entries[1]} />
          <Entry type={getRecentEntryType(2)} {...entries[2]} />
          <Entry type={getRecentEntryType(3)} {...entries[3]} />
        </>
      )
    } else if (ipadWindow.matches) {
      return (
        <>
          <div className='first-row'>
            <Entry type={getRecentEntryType(0)} {...entries[0]} />
          </div>
          <div className='stacked-entries'>
            <Entry type={getRecentEntryType(1)} {...entries[1]} />
            <Entry type={getRecentEntryType(2)} {...entries[2]} />
          </div>
          <div className='last-item'>
            <Entry type={getRecentEntryType(3)} {...entries[3]} />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='first-row'>
            <Entry type={getRecentEntryType(0)} {...entries[0]} />
            <div className='stacked-entries'>
              <Entry type={getRecentEntryType(1)} {...entries[1]} />
              <Entry type={getRecentEntryType(2)} {...entries[2]} />
            </div>
          </div>
          <div className='last-item'>
            <Entry type={getRecentEntryType(3)} {...entries[3]} />
          </div>
        </>
      )
    }
  }

  function getRecentEntryType (itemIndex: number) {
    const phoneWindow = window.matchMedia('(max-width: 390px)')

    if (phoneWindow.matches) {
      return ENTRY_TYPES.SMALL_PICTURE_TOP
    }

    const ipadWindow = window.matchMedia('(max-width: 834px)')

    if (ipadWindow.matches) {
      switch (itemIndex) {
        case 0:
          return ENTRY_TYPES.BIG_PICTURE_TOP
        case 1:
        case 2:
          return ENTRY_TYPES.SMALL_PICTURE_LEFT
        case 3:
          return ENTRY_TYPES.BIG_PICTURE_TOP
        default:
          return ENTRY_TYPES.BIG_PICTURE_TOP
      }
    }

    switch (itemIndex) {
      case 0:
        return ENTRY_TYPES.MEDIUM_PICTURE_TOP
      case 1:
      case 2:
        return ENTRY_TYPES.SMALL_PICTURE_LEFT
      case 3:
        return ENTRY_TYPES.MEDIUM_PICTURE_LEFT
      default:
        return ENTRY_TYPES.BIG_PICTURE_TOP
    }
  }

  return (
    <section
      id={id}
      className='entry-section-container'
      aria-labelledby={`title-${sectionId}`}
    >
      <h2 id={`title-${sectionId}`} className='section-title'>
        {titleName}
      </h2>
      {container}
      {allType && <Paginator pageNumber={pageNumber!} />}
    </section>
  )
}

export { EntrySection }
