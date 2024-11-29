import { render, screen } from 'testing-library-utils'
import userEvent from '@testing-library/user-event'

import { EntrySection } from '../EntrySection'
import { DUMMY_ENTRY, type EntryInterface } from 'src/data'
import { generateUUID } from 'src/utils'
import { getMockedDummyArray } from 'src/test-utils'

const setMatcher = ({
  queryToMatch,
  passMatch = false
}: {
  queryToMatch: string
  passMatch?: boolean
}) => {
  return vi.stubGlobal('matchMedia', (query: string) => ({
    matches: passMatch || query === queryToMatch,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Optional, for legacy support
    removeListener: vi.fn(), // Optional, for legacy support
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('all entries', () => {
  test('all screen sizes behave the same', () => {
    setMatcher({ queryToMatch: '(max-width: 390px)' })
    let { unmount } = render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        titleName='All blog posts'
        isAllType
      />
    )

    let allContainer = screen.getByRole('region', {
      name: /All blog posts/i
    })
    let allList = screen.getByRole('list', { name: /All Entries List/i })
    expect(allContainer).toBeInTheDocument()
    expect(allList).toHaveClass('entry-container all-container')
    unmount()

    setMatcher({ queryToMatch: '(max-width: 834px)' })
    ;({ unmount } = render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        titleName='All blog posts'
        isAllType
      />
    ))

    allContainer = screen.getByRole('region', {
      name: /All blog posts/i
    })
    allList = screen.getByRole('list', { name: /All Entries List/i })
    expect(allContainer).toBeInTheDocument()
    expect(allList).toHaveClass('entry-container all-container')
    unmount()

    setMatcher({ queryToMatch: '(max-width: 1920px)' })
    ;({ unmount } = render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        titleName='All blog posts'
        isAllType
      />
    ))
    allContainer = screen.getByRole('region', {
      name: /All blog posts/i
    })
    allList = screen.getByRole('list', { name: /All Entries List/i })
    expect(allContainer).toBeInTheDocument()
    expect(allList).toHaveClass('entry-container all-container')
  })

  test('entries follow accesible properties', () => {
    const mockEntries: EntryInterface[] = [DUMMY_ENTRY]
    render(
      <EntrySection
        id='all'
        data={mockEntries}
        pageNumber={0}
        titleName='All blog posts'
        isAllType
      />
    )

    const articleElements = screen.getAllByRole('article', {
      name: /UX review presentations/i
    })
    const ariaLabelIds = articleElements.map(element =>
      element.getAttribute('aria-labelledby')
    )
    const labelEntryId = screen.getByRole('heading', {
      name: /UX review presentations/i
    }).id
    expect(articleElements).toHaveLength(1)
    expect(ariaLabelIds[0]).toContain(['title-DUMMY-1'])
    expect(labelEntryId).toContain('title-DUMMY-1')
  })

  test('paginator is present, with correct accesibility and navigability', async () => {
    const elementNumberFromNextToPrevious = 3
    const user = userEvent.setup()
    const expectedPageNumber = 2
    const data = Array(4)
      .fill(null)
      .map(() => ({ ...DUMMY_ENTRY, id: generateUUID() }))

    render(
      <EntrySection
        id='all'
        data={data} // We asume this is the data corresponding to the active page on store
        pageNumber={expectedPageNumber} // The number of pages to render is calulcated upstream
        titleName='All blog posts'
        isAllType
      />
    )

    const paginator = screen.getByRole('navigation', {
      name: /All Entries Pagination Controls/i
    })
    expect(paginator).toBeInTheDocument()

    const previousButton = screen.getByRole('button', {
      name: /Go to previous page/i
    })
    const nextButton = screen.getByRole('button', { name: /Go to next page/i })
    expect(previousButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    const previousButtonSvg = previousButton.querySelector('svg')
    const nextButtonSvg = nextButton.querySelector('svg')
    expect(previousButtonSvg).toBeInTheDocument()
    expect(previousButtonSvg).toHaveAttribute('aria-hidden', 'true')
    expect(nextButtonSvg).toBeInTheDocument()
    expect(nextButtonSvg).toHaveAttribute('aria-hidden', 'true')

    const defaultCurrentPage = screen.getByRole('button', {
      name: /Go to page 1/i
    })
    const nonCurrentPage = screen.getByRole('button', { name: /Go to page 2/i })
    const allPageButtons = screen
      .getAllByRole('button')
      .filter(element => element.className.includes('page-button'))
    expect(defaultCurrentPage).toBeInTheDocument()
    expect(defaultCurrentPage).toHaveAttribute('aria-current')
    expect(nonCurrentPage).not.toHaveAttribute('aria-current')
    expect(allPageButtons).toHaveLength(expectedPageNumber)

    // Tab all entries first
    for (let i = 0; i < data.length + 1; i++) {
      await user.tab()
    }
    expect(previousButton).toHaveFocus()

    await user.tab()
    expect(defaultCurrentPage).toHaveFocus()

    await user.tab()
    expect(nonCurrentPage).toHaveFocus()

    await user.tab()
    expect(nextButton).toHaveFocus()

    for (let i = 0; i < elementNumberFromNextToPrevious; i++) {
      await user.tab({ shift: true })
    }
    expect(previousButton).toHaveFocus()

    await user.keyboard('{enter}')
    expect(previousButton).toHaveFocus()

    await user.tab()
    await user.tab()
    expect(nonCurrentPage).toHaveFocus()

    await user.keyboard(' ')
    expect(nonCurrentPage).toHaveFocus()
    expect(defaultCurrentPage).not.toHaveAttribute('aria-current')
    expect(nonCurrentPage).toHaveAttribute('aria-current')

    await user.tab({ shift: true })
    await user.keyboard('{enter}')
    expect(defaultCurrentPage).toHaveFocus()
    expect(defaultCurrentPage).toHaveAttribute('aria-current')
    expect(nonCurrentPage).not.toHaveAttribute('aria-current')

    await user.click(nonCurrentPage)
    expect(defaultCurrentPage).not.toHaveFocus()
    expect(defaultCurrentPage).not.toHaveAttribute('aria-current')
    expect(nonCurrentPage).toHaveAttribute('aria-current')
  })
})

describe('recent entries', () => {
  test('paginator is not rendered', () => {
    render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )
    const paginator = screen.queryByRole('navigation', {
      name: /All Entries Pagination Controls/i
    })
    expect(paginator).not.toBeInTheDocument()
  })

  test('mobile screen size has specific layout', () => {
    const data = getMockedDummyArray(5)
    setMatcher({ queryToMatch: '(max-width: 390px)' })
    render(
      <EntrySection
        id='all'
        data={data}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    const recentContainer = screen.getByRole('region', {
      name: /Recent blog posts/i
    })
    const recentList = screen.getByRole('list', {
      name: /Recent Entries List/i
    })
    expect(recentContainer).toBeInTheDocument()
    expect(recentList).toHaveClass('entry-container recent-mobile-container')
  })

  test('ipad screen size has specific layout', () => {
    const data = getMockedDummyArray(5)
    setMatcher({ queryToMatch: '(max-width: 834px)' })
    render(
      <EntrySection
        id='all'
        data={data}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    const recentContainer = screen.getByRole('region', {
      name: /Recent blog posts/i
    })
    const recentList = screen.getByRole('list', {
      name: /Recent Entries List/i
    })
    expect(recentContainer).toBeInTheDocument()
    expect(recentList).toHaveClass('entry-container recent-ipad-container')
  })

  test('desktop screen size has specific layout', () => {
    const data = getMockedDummyArray(5)
    setMatcher({ queryToMatch: '(max-width: 1920px)' }) // Passing a whatever value
    render(
      <EntrySection
        id='all'
        data={data}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    const recentContainer = screen.getByRole('region', {
      name: /Recent blog posts/i
    })
    const recentList = screen.getByRole('list', {
      name: /Recent Entries List/i
    })
    expect(recentContainer).toBeInTheDocument()
    expect(recentList).toHaveClass('entry-container recent-desktop-container')
  })

  test('passing invalid amount of entries should not render items', () => {
    render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    const entries = screen.queryAllByRole('article')
    expect(entries).toHaveLength(0)
  })

  test('passing skeleton tagged entries should render skeleton items', () => {
    const data = Array(4).fill(DUMMY_ENTRY)
    const { unmount } = render(
      <EntrySection
        id='all'
        data={data}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    let entries = screen.queryAllByRole('article')
    expect(entries).toHaveLength(4)
    entries.forEach(entry => {
      expect(entry).toHaveClass('skeleton')
    })
    unmount()

    let skeletonEntries = 0
    let nonSkeletonEntries = 0
    const firstHalf = Array(2).fill(DUMMY_ENTRY)
    const secondHalf = Array(2).fill({
      ...DUMMY_ENTRY,
      id: '70e2c51a-f70f-4df5-9cb8-bc4b88260888'
    })
    render(
      <EntrySection
        id='all'
        data={[...firstHalf, ...secondHalf]}
        pageNumber={0}
        titleName='Recent blog posts'
      />
    )

    entries = screen.queryAllByRole('article')
    expect(entries).toHaveLength(4)
    entries.forEach(entry => {
      if (entry.className.includes('skeleton')) {
        skeletonEntries++
      } else {
        nonSkeletonEntries++
      }
    })
    expect(skeletonEntries).toBe(2)
    expect(nonSkeletonEntries).toBe(2)
  })
})
