import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filter, tap } from 'rxjs'

import { BlogEntrySidebar } from './BlogEntrySidebar'
import { BlogEntryDetail } from './BlogEntryDetail'

import './BlogEntry.css'
import { blogStore, updateEntryLoaded } from '../../store'

function BlogEntry () {
  const [entryId, setEntryId] = useState<string | undefined>(undefined)
  const [validatedEntryId, setValidatedEntryId] = useState<string | undefined>(
    undefined
  )

  const { id } = useParams()

  useEffect(() => {
    const subscription = blogStore
      .pipe(
        filter(state => state.routing),
        tap(state => {
          updateEntryLoaded()
          setEntryId(state.blogId)
        })
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setValidatedEntryId(entryId ?? id)
  }, [entryId, id])

  return (
    <div className='entry-container'>
      <section className='sidebar'>
        <BlogEntrySidebar entryId={validatedEntryId!} />
      </section>
      <section className='detail'>
        <BlogEntryDetail entryId={validatedEntryId!} />
      </section>
    </div>
  )
}

export { BlogEntry }
