import { render, screen } from 'testing-library-utils'

import { EntrySection } from '../EntrySection'
import { DUMMY_ENTRY, type EntryInterface } from 'src/data'

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

describe('all entries', () => {
  test('all screen sizes behave the same', () => {
    setMatcher({ queryToMatch: '(max-width: 390px)' })
    let { unmount } = render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        pageSize={10}
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
        pageSize={10}
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
        pageSize={10}
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
        pageSize={10}
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
    expect(ariaLabelIds).toEqual(['title-DUMMY-1'])
    expect(labelEntryId).toBe('title-DUMMY-1')
  })
})

describe('recent entries', () => {
  test('mobile screen size has specific layout', () => {
    setMatcher({ queryToMatch: '(max-width: 390px)' })
    render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        pageSize={10}
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
    setMatcher({ queryToMatch: '(max-width: 834px)' })
    render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        pageSize={10}
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
    setMatcher({ queryToMatch: '(max-width: 1920px)' }) // Passing a whatever value
    render(
      <EntrySection
        id='all'
        data={[]}
        pageNumber={0}
        pageSize={10}
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
        pageSize={10}
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
        pageSize={10}
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
        pageSize={10}
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
