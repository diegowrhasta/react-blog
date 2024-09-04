import { Tag } from './Tag/Tag'

import { EntryInterface } from '../../../data'
import * as dateUtils from '../../../utils/date'
import './Entry.css'

interface EntryProps extends EntryInterface {}

export function Entry ({
  id,
  author,
  date,
  title,
  previewText,
  labels
}: EntryProps) {
  const tags = labels.map(entry => {
    return <Tag label={entry} />
  })

  return (
    <div key={id} className='entry'>
      <img
        src='https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
        alt='desktop'
      />
      <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
        date
      )}`}</label>
      <span className='title'>{title}</span>
      <div className='text-preview'>{previewText}</div>
      <span className='labels'>{tags}</span>
    </div>
  )
}
