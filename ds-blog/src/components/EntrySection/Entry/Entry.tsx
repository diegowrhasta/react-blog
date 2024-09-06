import { Tag } from './Tag/Tag'

import { EntryInterface } from '../../../data'
import * as dateUtils from '../../../utils/date'
import './Entry.css'
import { ENTRY_TYPES } from '../../../constants'

interface EntryProps extends EntryInterface {
  type: EntryTypes
}

type EntryTypes = typeof ENTRY_TYPES[keyof typeof ENTRY_TYPES]

function Entry (props: EntryProps) {
  const tags = props.labels.map(entry => {
    return <Tag label={entry} />
  })

  const entry = getEntryType(props, tags)

  return entry
}

function getEntryType (
  { id, author, date, title, previewText, type }: EntryProps,
  tags: JSX.Element[]
) {
  switch (type) {
    case 'medium-picture-top':
      return (
        <div key={id} className={`entry ${type}`}>
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
    case 'small-picture-left':
      return (
        <div key={id} className={`entry ${type}`}>
          <img
            src='https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
            alt='desktop'
          />
          <section className='text'>
            <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
              date
            )}`}</label>
            <span className='title'>{title}</span>
            <div className='text-preview'>{previewText}</div>
            <span className='labels'>{tags}</span>
          </section>
        </div>
      )
    case 'medium-picture-left':
      return (
        <div key={id} className={`entry ${type}`}>
          <img
            src='https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
            alt='desktop'
          />
          <section className='text'>
            <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
              date
            )}`}</label>
            <span className='title'>{title}</span>
            <div className='text-preview'>{previewText}</div>
            <span className='labels'>{tags}</span>
          </section>
        </div>
      )
    case 'big-picture-top':
      return (
        <div key={id} className={`entry ${type}`}>
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
    default:
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
}

export { Entry }
