import { useEffect, useState } from 'react'
import './BlogEntryDetail.css'
import { getBlogEntry } from '../../../data'

interface BlogEntryDetailProps {
  entryId: string
}

function BlogEntryDetail ({ entryId }: BlogEntryDetailProps) {
  const [entryContent, setEntryContent] = useState('')

  useEffect(() => {
    if (!entryId) {
      return
    }

    const { date } = getBlogEntry(entryId)!

    fetch(`/blogs/${date.getFullYear()}/${date.getMonth() + 1}/${entryId}.html`)
      .then(response => {
        return response.text()
      })
      .then(setEntryContent)
      .catch(console.log)
  }, [entryId])

  return <article dangerouslySetInnerHTML={{ __html: entryContent }}></article>
}

export { BlogEntryDetail }
