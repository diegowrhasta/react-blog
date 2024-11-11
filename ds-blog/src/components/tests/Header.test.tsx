import { render, screen } from 'testing-library-utils'

import { Header } from '../Header'

test('header has correct author, options and button', () => {
  // Mock the window size to simulate a big screen
  global.innerWidth = 1920
  global.dispatchEvent(new Event('resize'))

  render(<Header onModeButtonClick={vi.fn()} />)

  const authorHeading = screen.getByRole('heading', {
    name: /Diego Balderrama/i
  })
  expect(authorHeading).toBeInTheDocument()

  const navigationOptions = screen.getAllByRole('link')
  const optionsText = navigationOptions.map(element => element.textContent)
  expect(navigationOptions).toHaveLength(4)
  expect(optionsText).toEqual(['Home', 'Recent', 'All', 'About'])

  const componentButtons = screen.getAllByRole('button')
  const modeButton = screen.getByRole('button', { name: /Mode Button/i })
  expect(componentButtons).toHaveLength(2)
  expect(modeButton).toBeInTheDocument()
})
