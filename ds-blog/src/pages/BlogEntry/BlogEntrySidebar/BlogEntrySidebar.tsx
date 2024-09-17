import { useEffect, useState } from 'react'
import { filter, tap } from 'rxjs'

import { Entry } from '../../../components'

import './BlogEntrySidebar.css'
import { EntryInterface } from '../../../data'
import { allEntriesStore } from '../../../store'

interface BlogEntrySidebarProps {
  entryId: string
}

function BlogEntrySidebar ({ entryId }: BlogEntrySidebarProps) {
  const [entries, setEntries] = useState<EntryInterface[]>([])

  useEffect(() => {
    const subscription = allEntriesStore
      .pipe(
        filter(state => !!state.allEntries),
        tap(state => {
          setEntries(state.allEntries!)
        })
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const entriesElements = entries
    .map(entry => {
      if (entry.id === entryId) {
        return null
      }

      return <Entry {...entry}></Entry>
    })
    .slice(0, 6)

  return (
    <div className='recent-blog-entries'>
      <span className='title'>Recent blog posts</span>
      {entriesElements}
    </div>
  )
}

export { BlogEntrySidebar }
