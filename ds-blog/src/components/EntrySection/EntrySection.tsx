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
  pageSize?: number
  data: EntryInterface[]
}

function EntrySection ({
  titleName,
  isAllType,
  pageNumber,
  pageSize,
  data,
  id
}: EntrySectionProps) {
  const allType = !!isAllType

  const container = allType ? getAllLayout(data) : getRecentLayout(data)

  return (
    <div id={id} className='entry-section-container'>
      <span className='title'>{titleName}</span>
      {container}
      {allType && <Paginator pageNumber={pageNumber!} pageSize={pageSize!} />}
    </div>
  )
}

function getAllLayout (entries: EntryInterface[]) {
  const genericEntries = entries.map(entry => {
    return <Entry key={entry.id} {...entry} />
  })

  return <div className='entry-container all-container'>{genericEntries}</div>
}

function getRecentLayout (entries: EntryInterface[]) {
  return (
    <div className='entry-container recent-container'>
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
    </div>
  )
}

function getRecentEntryType (itemIndex: number) {
  const width = window.innerWidth

  if (width >= 1440) {
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

  return ENTRY_TYPES.BIG_PICTURE_TOP
}

export { EntrySection }
