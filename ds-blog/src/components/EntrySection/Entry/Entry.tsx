import { Tag } from './Tag/Tag'

import { type EntryInterface } from '../../../data'
import * as dateUtils from '../../../utils/date'
import './Entry.css'
import { type ENTRY_TYPES } from '../../../constants'
import { useBlogDetailStore } from '../../../store'
import { useNavigate } from 'react-router-dom'

interface EntryProps extends EntryInterface {
  type?: EntryTypes | undefined
}

type EntryTypes = typeof ENTRY_TYPES[keyof typeof ENTRY_TYPES]

const DUMMY_ID = 'DUMMY-1'

function Entry (props: EntryProps) {
  const navigate = useNavigate()
  const triggerRouting = useBlogDetailStore(state => state.triggerRouting)
  const isSkeletonEntry = props.id === DUMMY_ID

  const tags = (props.labels ?? []).map((entry, index) => {
    return <Tag key={`${index}-tag`} label={entry} />
  })

  const entry = getEntryType(props, tags)
  const coalescedType = props.type || 'small-picture-top'

  function onEntryClick (event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation()

    if (isSkeletonEntry) {
      return
    }

    triggerRouting(props.id)
    navigate(`/entry/${props.id}`)
  }

  return (
    <article
      aria-labelledby={`title-${props.id}`}
      onClick={onEntryClick}
      key={props.id}
      className={`entry ${coalescedType} ${isSkeletonEntry ? 'skeleton' : ''}`}
    >
      {entry}
    </article>
  )
}

function getEntryType (
  { id, author, date, title, previewText, type, previewImage }: EntryProps,
  tags: JSX.Element[]
) {
  switch (type) {
    case 'medium-picture-top':
      return (
        <>
          <div className='image-container'>
            <img
              src={
                previewImage ??
                'https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
              }
              alt='desktop'
            />
          </div>
          <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
            date
          )}`}</label>
          <h2 id={`title-${id}`} className='title'>
            {title}
          </h2>
          <div className='text-preview'>{previewText}</div>
          <span className='labels'>{tags}</span>
        </>
      )
    case 'small-picture-left':
      return (
        <>
          <div className='image-container'>
            <img
              src={
                previewImage ??
                'https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
              }
              alt='desktop'
            />
          </div>
          <section className='text'>
            <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
              date
            )}`}</label>
            <h2 className='title'>{title}</h2>
            <div className='text-preview'>{previewText}</div>
            <span className='labels'>{tags}</span>
          </section>
        </>
      )
    case 'medium-picture-left':
      return (
        <>
          <div className='image-container'>
            <img
              src={
                previewImage ??
                'https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
              }
              alt='desktop'
            />
          </div>
          <section className='text'>
            <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
              date
            )}`}</label>
            <h2 id={`title-${id}`} className='title'>
              {title}
            </h2>
            <div className='text-preview'>{previewText}</div>
            <span className='labels'>{tags}</span>
          </section>
        </>
      )
    case 'big-picture-top':
      return (
        <>
          <div className='image-container'>
            <img
              src={
                previewImage ??
                'https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
              }
              alt='desktop'
            />
          </div>
          <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
            date
          )}`}</label>
          <h2 id={`title-${id}`} className='title'>
            {title}
          </h2>
          <div className='text-preview'>{previewText}</div>
          <span className='labels'>{tags}</span>
        </>
      )
    default:
      return (
        <>
          <div className='image-container'>
            <img
              src={
                previewImage ??
                'https://i.blogs.es/89b87a/dell-equipo/450_1000.jpg'
              }
              alt='desktop'
            />
          </div>
          <label className='main-details'>{`${author} • ${dateUtils.dateToShortString(
            date
          )}`}</label>
          <h2 id={`title-${id}`} className='title'>
            {title}
          </h2>
          <div className='text-preview'>{previewText}</div>
          <span className='labels'>{tags}</span>
        </>
      )
  }
}

export { Entry }
