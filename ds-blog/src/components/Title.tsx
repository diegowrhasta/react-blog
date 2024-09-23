import { useTitleStore } from '../store'

import './Title.css'

export function Title () {
  const title = useTitleStore(state => state.title)

  return <div className='title'>{title}</div>
}
