import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Paginator } from '../Paginator'
import { useGlobalStore } from 'src/store'

test('overflow pages get simplified correctly', async () => {
  const pageNumber = 10
  render(<Paginator pageNumber={pageNumber} />)

  let pageButtons = screen
    .getAllByRole('button')
    .filter(element => element.ariaLabel?.includes('Go to page'))
  let buttonTexts = pageButtons.map(element => element.ariaLabel)
  let firstPageButton = screen.getByRole('button', {
    name: /^Go to page 1$/i
  })
  let secondPageButton = screen.getByRole('button', {
    name: /^Go to page 2$/i
  })
  let thirdPageButton = screen.getByRole('button', {
    name: /^Go to page 3$/i
  })
  let lastPageButton = screen.getByRole('button', {
    name: /^Go to page 10$/i
  })
  let secondToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 9$/i
  })
  let thirdToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 8$/i
  })
  expect(buttonTexts).toEqual([
    'Go to page 1',
    'Go to page 2',
    'Go to page 3',
    'Go to page 8',
    'Go to page 9',
    'Go to page 10'
  ])
  expect(pageButtons).toHaveLength(6)
  expect(firstPageButton).toBeInTheDocument()
  expect(secondPageButton).toBeInTheDocument()
  expect(thirdPageButton).toBeInTheDocument()
  expect(lastPageButton).toBeInTheDocument()
  expect(secondToLastPageButton).toBeInTheDocument()
  expect(thirdToLastPageButton).toBeInTheDocument()

  const ellipsisButton = screen.getByRole('button', {
    name: /Skipped pages, not clickable/i
  })
  expect(ellipsisButton).toBeInTheDocument()

  await userEvent.click(ellipsisButton)
  const storeScrollToBottom = useGlobalStore.getState().scrollToBottom
  expect(storeScrollToBottom).toBeFalsy()

  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  expect(thirdToLastPageButton).toHaveFocus()

  await userEvent.click(thirdPageButton)
  const nextPageButton = screen.getByRole('button', {
    name: /Go to next page/i
  })
  await userEvent.click(nextPageButton)
  pageButtons = screen
    .getAllByRole('button')
    .filter(element => element.ariaLabel?.includes('Go to page'))
  buttonTexts = pageButtons.map(element => element.ariaLabel)
  firstPageButton = screen.getByRole('button', {
    name: /^Go to page 2$/i
  })
  secondPageButton = screen.getByRole('button', {
    name: /^Go to page 3$/i
  })
  thirdPageButton = screen.getByRole('button', {
    name: /^Go to page 4$/i
  })
  lastPageButton = screen.getByRole('button', {
    name: /^Go to page 10$/i
  })
  secondToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 9$/i
  })
  thirdToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 8$/i
  })
  expect(buttonTexts).toEqual([
    'Go to page 2',
    'Go to page 3',
    'Go to page 4',
    'Go to page 8',
    'Go to page 9',
    'Go to page 10'
  ])
  expect(pageButtons).toHaveLength(6)
  expect(ellipsisButton).not.toHaveClass('selected')
  expect(thirdPageButton).toHaveClass('selected')

  await userEvent.click(nextPageButton)
  await userEvent.click(nextPageButton)
  await userEvent.click(nextPageButton)
  await userEvent.click(nextPageButton)
  pageButtons = screen
    .getAllByRole('button')
    .filter(element => element.ariaLabel?.includes('Go to page'))
  buttonTexts = pageButtons.map(element => element.ariaLabel)
  firstPageButton = screen.getByRole('button', {
    name: /^Go to page 1$/i
  })
  secondPageButton = screen.getByRole('button', {
    name: /^Go to page 2$/i
  })
  thirdPageButton = screen.getByRole('button', {
    name: /^Go to page 3$/i
  })
  lastPageButton = screen.getByRole('button', {
    name: /^Go to page 10$/i
  })
  secondToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 9$/i
  })
  thirdToLastPageButton = screen.getByRole('button', {
    name: /^Go to page 8$/i
  })
  expect(buttonTexts).toEqual([
    'Go to page 1',
    'Go to page 2',
    'Go to page 3',
    'Go to page 8',
    'Go to page 9',
    'Go to page 10'
  ])
  expect(pageButtons).toHaveLength(6)
  expect(thirdToLastPageButton).toHaveClass('selected')
})
