import { Entry } from '../../../components'

import './BlogEntrySidebar.css'
import { useAllEntriesStore } from '../../../store'

interface BlogEntrySidebarProps {
  entryId: string
}

function BlogEntrySidebar ({ entryId }: BlogEntrySidebarProps) {
  const allEntries = useAllEntriesStore(state => state.allEntries)

  const entriesElements = allEntries!
    .filter(entry => entry.id !== entryId)
    .map(entry => {
      return <Entry key={entry.id} {...entry}></Entry>
    })
    .slice(0, 5)

  return (
    <div className='recent-blog-entries'>
      <span className='title'>Recent blog posts</span>
      {entriesElements}
    </div>
  )
}

export { BlogEntrySidebar }
