import { render, screen } from 'testing-library-utils'

import { EntrySection } from '../EntrySection'

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

    setMatcher({ queryToMatch: '', passMatch: true })
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
