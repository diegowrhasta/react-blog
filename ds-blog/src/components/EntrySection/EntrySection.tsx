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

  // const layoutTypeClass = allType ? 'all-container' : 'recent-container'
  // const entries = data.map(entry => {
  //   return <Entry {...entry} />
  // })

  let container = <></>
  if (!allType) {
    container = getRecentLayout(data)
  }

  return (
    <>
      <span className='title'>{titleName}</span>
      {container}
    </>
  )
}

function getRecentLayout (entries: EntryInterface[]) {
  return (
    <div>
      <div className='entry-container recent-container'>
        <div className='first-row'>
          <Entry {...entries[0]} />
          <div className='stacked-entries'>
            <Entry {...entries[1]} />
            <Entry {...entries[2]} />
          </div>
        </div>
        <div className='last-item'>
          <Entry {...entries[3]} />
        </div>
      </div>
    </div>
  )
}
