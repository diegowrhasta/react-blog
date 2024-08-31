import { createStore, withProps } from '@ngneat/elf'

import { TitleInterface } from './interfaces'

const titleInitialState: TitleInterface = {
  title: undefined
}

export function updateTitle (title: string) {
  titleStore.update(state => ({
    ...state,
    title: title
  }))
}

export const titleStore = createStore(
  { name: 'title' },
  withProps<TitleInterface>(titleInitialState)
)
