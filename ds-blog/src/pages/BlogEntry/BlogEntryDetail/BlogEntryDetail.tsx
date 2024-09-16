import { useEffect, useState } from 'react'
import './BlogEntryDetail.css'

function BlogEntryDetail () {
  const [entryContent, setEntryContent] = useState('')

  useEffect(() => {
    fetch('/blogs/testing-brother.html')
      .then(response => {
        return response.text()
      })
      .then(setEntryContent)
      .catch(console.log)
  }, [])

  return <article dangerouslySetInnerHTML={{ __html: entryContent }}></article>
}

export { BlogEntryDetail }
