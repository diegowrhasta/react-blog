import { Entry } from './Entry/Entry'

import { EntryInterface } from '../../data'
import './EntrySection.css'

interface EntrySectionProps {
  titleName: string | undefined
  isAllType?: boolean
  data: EntryInterface[]
}

export function EntrySection ({
  titleName,
  isAllType,
  data
}: EntrySectionProps) {
  const allType = !!isAllType

  const layoutTypeClass = allType ? 'all-container' : 'recent-container'
  const entries = data.map((entry) => {
    return <Entry {...entry} />
  })

  return (
    <>
      <span className='title'>{titleName}</span>
      <div className={`entry-container ${layoutTypeClass}`}>{entries}</div>
    </>
  )
}
