import { useGlobalStore } from '../store'

import './Title.css'

export function Title () {
  const title = useGlobalStore(state => state.title)

  return <h1 className='title'>{title}</h1>
}
