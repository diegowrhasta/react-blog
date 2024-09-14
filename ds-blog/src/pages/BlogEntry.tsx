import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { filter, tap } from 'rxjs'

import './BlogEntry.css'
import { blogStore, updateEntryLoaded } from '../store'

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

  return <>{validatedEntryId}</>
}

export { BlogEntry }
