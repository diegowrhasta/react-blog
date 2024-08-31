import { useEffect, useState } from 'react'
import { Subject, takeUntil, tap } from 'rxjs'

import { titleStore } from '../store'

import './Title.css'
import * as observableUtils from '../utils/observables'

export function Title () {
  const [titleText, setTitleText] = useState(titleStore.getValue().title)
  const [onDestroy$] = useState(new Subject<boolean>())

  useEffect(() => {
    titleStore
      .pipe(
        takeUntil(onDestroy$),
        tap(state => {
          setTitleText(state.title)
        })
      )
      .subscribe()
    return () => {
      observableUtils.RunNotifier(onDestroy$)
    }
  }, [onDestroy$])

  return <div className='title'>{titleText}</div>
}
