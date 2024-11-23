import { screen, render } from 'testing-library-utils'
import userEvent from '@testing-library/user-event'

import { Home } from '../Home'
import { seedStoreWithDummies } from 'src/test-utils'

beforeAll(() => {
  seedStoreWithDummies(10)
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
