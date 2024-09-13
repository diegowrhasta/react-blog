import { useEffect, useState } from 'react'

import './BlogEntry.css'
import { blogStore } from '../store'

function BlogEntry () {
  const [store] = useState(
    blogStore.subscribe(state => {
      console.log('stateChanged', state)
    })
  )

  useEffect(() => {
    return () => {
      store.unsubscribe()
    }
  })
  return <>This is blog Entry, yes.</>
}

export { BlogEntry }
