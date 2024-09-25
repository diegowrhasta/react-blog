import { Tag } from './Tag/Tag'

import { EntryInterface } from '../../../data'
import * as dateUtils from '../../../utils/date'
import './Entry.css'
import { ENTRY_TYPES } from '../../../constants'
import { useBlogDetailStore } from '../../../store'
import { useNavigate } from 'react-router-dom'

interface EntryProps extends EntryInterface {
  type?: EntryTypes | undefined
}

type EntryTypes = typeof ENTRY_TYPES[keyof typeof ENTRY_TYPES]

function Entry (props: EntryProps) {
  const navigate = useNavigate()
  const triggerRouting = useBlogDetailStore(state => state.triggerRouting)

  const tags = (props.labels ?? []).map((entry, index) => {
    return <Tag key={`${index}-tag`} label={entry} />
  })

  const entry = getEntryType(props, tags)
  const coalescedType = props.type ? props.type : 'small-picture-top'

  function onEntryClick (event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation()

    triggerRouting(props.id)
    navigate(`/entry/${props.id}`)
  }

  return (
    <div
      onClick={onEntryClick}
      key={props.id}
      className={`entry ${coalescedType}`}
    >
      {entry}
    </div>
  )
}

function getEntryType (
  { author, date, title, previewText, type }: EntryProps,
  tags: JSX.Element[]
) {
  switch (type) {
    case 'medium-picture-top':
      return (
        <>
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
        </>
      )
    case 'small-picture-left':
      return (
        <>
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
        </>
      )
    case 'medium-picture-left':
      return (
        <>
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
        </>
      )
    case 'big-picture-top':
      return (
        <>
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
        </>
      )
    default:
      return (
        <>
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
        </>
      )
  }
}

export { Entry }
