import { useEffect, useRef, useState } from 'react'
import './BlogEntryDetail.css'
import { getBlogEntry } from '../../../data'
import { useBlogDetailStore } from '../../../store'

interface BlogEntryDetailProps {
  entryId: string
}

function BlogEntryDetail ({ entryId }: BlogEntryDetailProps) {
  const detailLoading = useBlogDetailStore(state => state.detailLoading)
  const setIsLoading = useBlogDetailStore(state => state.setDetailLoading)

  const [entryContent, setEntryContent] = useState('')
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!entryId) {
      return
    }

    const triggerReadPosition = () => {
      setIsLoading(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    setIsLoading(true)
    const { date } = getBlogEntry(entryId)!

    fetch(`/blogs/${date.getFullYear()}/${date.getMonth() + 1}/${entryId}.html`)
      .then(response => {
        return response.text()
      })
      .then(setEntryContent)
      .then(triggerReadPosition)
      .catch(console.log)
  }, [entryId, setIsLoading])

  useEffect(() => {
    const checkImagesLoaded = (
      ref: React.MutableRefObject<HTMLDivElement | null>
    ) => {
      if (ref.current == null) {
        return
      }

      setIsLoading(true)

      const images = ref.current.querySelectorAll('img')
      let loadedCount = 0

      const totalImages = images.length

      if (totalImages === 0) {
        setIsLoading(false)
        return
      }

      const handleLoad = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setIsLoading(false)
        }
      }

      const handleError = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setIsLoading(false)
        }
      }

      images.forEach(img => {
        if (img.complete) {
          loadedCount++
        } else {
          img.addEventListener('load', handleLoad)
          img.addEventListener('error', handleError)
        }
      })

      if (loadedCount === totalImages) {
        setIsLoading(false)
      }

      return () => {
        images.forEach(img => {
          img.removeEventListener('load', handleLoad)
          img.removeEventListener('error', handleError)
        })
      }
    }

    const cleanup = checkImagesLoaded(articleRef)

    return cleanup
  }, [articleRef, entryContent, setIsLoading])

  return (
    <>
      {detailLoading && <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
      {!detailLoading && (
        <article
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: entryContent }}
        ></article>
      )}
    </>
  )
}

export { BlogEntryDetail }
