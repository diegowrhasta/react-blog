import { useEffect, useRef, useState } from 'react'
import './BlogEntryDetail.css'
import { getBlogEntry, type LabelInterface } from '../../../data'
import { useBlogDetailStore } from '../../../store'
import { Tag } from '../../../components'

interface BlogEntryDetailProps {
  entryId: string
}

function BlogEntryDetail ({ entryId }: BlogEntryDetailProps) {
  const detailLoading = useBlogDetailStore(state => state.detailLoading)
  const setIsLoading = useBlogDetailStore(state => state.setDetailLoading)

  const [entryContent, setEntryContent] = useState('')
  const [tags, setTags] = useState<LabelInterface[]>([])
  const articleRef = useRef<HTMLDivElement>(null)

  // Loading of html effect
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
    const { date, labels } = getBlogEntry(entryId)!
    setTags(labels)

    fetch(`/blogs/${date.getFullYear()}/${date.getMonth() + 1}/${entryId}.html`)
      .then(response => {
        return response.text()
      })
      .then(setEntryContent)
      .then(triggerReadPosition)
      .catch(console.log)
  }, [entryId, setIsLoading])

  // Loading of all media check plus loading effect
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

  const tagElements = (tags ?? []).map((entry, index) => {
    return <Tag key={`${index}-tag`} label={entry} />
  })

  return (
    <>
      {detailLoading && <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
      {!detailLoading && (
        <div className='detail-container'>
          <article
            aria-labelledby='post-title'
            ref={articleRef}
            dangerouslySetInnerHTML={{ __html: entryContent }}
          ></article>
          <span className='labels'>{tagElements}</span>
        </div>
      )}
    </>
  )
}

export { BlogEntryDetail }
