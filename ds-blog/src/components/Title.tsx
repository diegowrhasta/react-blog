import { useEffect, useState } from 'react'
import { Subject, takeUntil, tap } from 'rxjs'

import { titleStore } from '../store'
import * as observableUtils from '../utils/observables'

import './Title.css'

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
