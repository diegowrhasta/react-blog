import { useGlobalStore } from '../store'

import './Title.css'

export function Title () {
  const title = useGlobalStore(state => state.title)

  return <div className='title'>{title}</div>
}
