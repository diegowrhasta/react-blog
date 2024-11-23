import { Entry } from '../../../components'

import './BlogEntrySidebar.css'
import { useAllEntriesStore } from '../../../store'

interface BlogEntrySidebarProps {
  entryId: string
}

function BlogEntrySidebar ({ entryId }: BlogEntrySidebarProps) {
  const allEntries = useAllEntriesStore(state => state.allEntries)

  const entriesElements = allEntries
    .filter(entry => entry.id !== entryId)
    .map(entry => {
      return <Entry key={entry.id} {...entry}></Entry>
    })
    .slice(0, 5)

  return (
    <section aria-labelledby='sidebar-title' className='recent-blog-entries'>
      <h2 id='sidebar-title' className='title'>
        Recent blog posts
      </h2>
      {entriesElements.length === 0 && (
        <p role='status' aria-live='polite' className='no-entries'>
          No more entries available...
        </p>
      )}
      {entriesElements}
    </section>
  )
}

export { BlogEntrySidebar }
