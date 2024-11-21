import { screen, render } from 'testing-library-utils'
import userEvent from '@testing-library/user-event'

import { Home } from '../Home'
import { DUMMY_ENTRY } from 'src/data'
import { generateUUID } from 'src/utils'
import * as entriesUtils from 'src/utils/entries'
import { useAllEntriesStore } from 'src/store'

beforeAll(() => {
  const data = Array(10)
    .fill(null)
    .map(() => ({ ...DUMMY_ENTRY, id: generateUUID() }))
  const entryData = data.sortEntriesDesc()
  const INITIAL_PAGE = 1
  const currentPageEntries = entriesUtils.getPageEntries(
    entryData,
    INITIAL_PAGE
  )
  const updateAllEntries = useAllEntriesStore.getState().updateAllEntries

  updateAllEntries(entryData, currentPageEntries, INITIAL_PAGE)
})

test('home page is accesible and navigable', async () => {
  render(<Home />)

  const allSection = screen.getByRole('region', { name: /All blog posts/i })
  const recentSection = screen.getByRole('region', {
    name: /Recent blog posts/i
  })
  expect(allSection).toBeInTheDocument()
  expect(recentSection).toBeInTheDocument()

  const recentEntries = recentSection.querySelectorAll('article')
  let allEntries = allSection.querySelectorAll('article')
  expect(recentEntries).toHaveLength(4)
  expect(allEntries).toHaveLength(6)

  const paginator = allSection.querySelector('[role="navigation"]')
  const paginatorButtons = paginator!.querySelectorAll('button')
  const pageButtons = paginator!.querySelectorAll('.page-button')
  expect(paginator).toBeInTheDocument()
  expect(paginatorButtons).toHaveLength(4)
  expect(pageButtons).toHaveLength(2)

  const pageTwoButton = screen.getByRole('button', { name: /Go to page 2/i })
  await userEvent.click(pageTwoButton)
  allEntries = allSection.querySelectorAll('article')
  expect(allEntries).toHaveLength(4)
  expect(recentEntries).toHaveLength(4)

  const nextPageButton = screen.getByRole('button', {
    name: /Go to next page/i
  })
  await userEvent.click(nextPageButton)
  allEntries = allSection.querySelectorAll('article')
  expect(allEntries).toHaveLength(4)
  expect(recentEntries).toHaveLength(4)

  await userEvent.tab({ shift: true })
  await userEvent.tab({ shift: true })
  await userEvent.keyboard('{enter}')
  allEntries = allSection.querySelectorAll('article')
  expect(allEntries).toHaveLength(6)
  expect(recentEntries).toHaveLength(4)

  const previousPageButton = screen.getByRole('button', {
    name: /Go to previous page/i
  })
  await userEvent.click(previousPageButton)
  allEntries = allSection.querySelectorAll('article')
  expect(allEntries).toHaveLength(6)
  expect(recentEntries).toHaveLength(4)
})
