function checkForImageLoading (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (ref.current == null) {
    return
  }

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

export { checkForImageLoading }
