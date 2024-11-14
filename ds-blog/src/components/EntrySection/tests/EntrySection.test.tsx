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
      name: /All Entries/i
    })
    expect(allContainer).toHaveClass('entry-container all-container')
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
      name: /All Entries/i
    })
    expect(allContainer).toHaveClass('entry-container all-container')
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
      name: /All Entries/i
    })
    expect(allContainer).toHaveClass('entry-container all-container')
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
    const labelEntry = screen.getByRole('heading', {
      name: /UX review presentations/i
    }).id
    expect(articleElements).toHaveLength(1)
    expect(ariaLabelIds).toEqual(['title-DUMMY-1'])
    expect(labelEntry).toBe('title-DUMMY-1')
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
      name: /Recent Entries/i
    })
    expect(recentContainer).toHaveClass(
      'entry-container recent-mobile-container'
    )
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
      name: /Recent Entries/i
    })
    expect(recentContainer).toHaveClass('entry-container recent-ipad-container')
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
      name: /Recent Entries/i
    })
    expect(recentContainer).toHaveClass(
      'entry-container recent-desktop-container'
    )
  })
})
