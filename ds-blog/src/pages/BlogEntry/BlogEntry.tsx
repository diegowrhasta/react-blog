import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BlogEntrySidebar } from './BlogEntrySidebar'
import { BlogEntryDetail } from './BlogEntryDetail'

import './BlogEntry.css'
import { useBlogDetailStore } from '../../store'

function BlogEntry () {
  const routing = useBlogDetailStore(state => state.routing)
  const blogId = useBlogDetailStore(state => state.blogId)
  const setEntryAsLoaded = useBlogDetailStore(state => state.setEntryAsLoaded)

  const [validatedEntryId, setValidatedEntryId] = useState<string | undefined>(
    undefined
  )

  const { id } = useParams()

  useEffect(() => {
    if (routing) {
      setEntryAsLoaded()
    }
  }, [routing, setEntryAsLoaded])

  useEffect(() => {
    setValidatedEntryId(blogId ?? id)
  }, [blogId, id])

  return (
    <div className='entry-container'>
      <section aria-label='Recent entries sidebar' className='sidebar'>
        <BlogEntrySidebar entryId={validatedEntryId!} />
      </section>
      <section aria-label='Post Content' className='detail'>
        <BlogEntryDetail entryId={validatedEntryId!} />
      </section>
    </div>
  )
}

export { BlogEntry }
