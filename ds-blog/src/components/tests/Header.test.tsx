import { render, screen } from 'testing-library-utils'
import userEvent from '@testing-library/user-event'

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

test('header is accesible and can be navigated', async () => {
  const buttonClickMock = vi.fn()
  render(<Header onModeButtonClick={buttonClickMock} />)

  const homeLink = screen.getByRole('link', { name: /Home/i })
  await userEvent.tab()
  expect(homeLink).toBeInTheDocument()
  expect(homeLink).toHaveFocus()

  await userEvent.tab()
  const recentLink = screen.getByRole('link', { name: /Recent/i })
  expect(recentLink).toBeInTheDocument()
  expect(homeLink).not.toHaveFocus()
  expect(recentLink).toHaveFocus()

  await userEvent.tab()
  const allLink = screen.getByRole('link', { name: /All/i })
  expect(allLink).toBeInTheDocument()
  expect(recentLink).not.toHaveFocus()
  expect(allLink).toHaveFocus()

  await userEvent.tab()
  const aboutLink = screen.getByRole('link', { name: /About/i })
  expect(aboutLink).toBeInTheDocument()
  expect(allLink).not.toHaveFocus()
  expect(aboutLink).toHaveFocus()

  await userEvent.tab()
  const modeButton = screen.getByRole('button', { name: /Mode Button/i })
  expect(modeButton).toBeInTheDocument()
  expect(aboutLink).not.toHaveFocus()
  expect(modeButton).toHaveFocus()

  await userEvent.keyboard(' ')
  expect(buttonClickMock).toHaveBeenCalledTimes(1)

  await userEvent.keyboard('{enter}')
  expect(buttonClickMock).toHaveBeenCalledTimes(2)

  await userEvent.click(modeButton)
  expect(buttonClickMock).toHaveBeenCalledTimes(3)

  await userEvent.tab({ shift: true })
  await userEvent.keyboard('{enter}') // Router links always remain focused
  expect(aboutLink).toHaveFocus()

  await userEvent.click(aboutLink)
  expect(aboutLink).toHaveFocus()

  await userEvent.tab({ shift: true })
  await userEvent.keyboard('{enter}') // Normal links remain focused if they don't find a target
  expect(allLink).toHaveFocus()

  await userEvent.click(recentLink)
  expect(recentLink).toHaveFocus()

  await userEvent.click(homeLink)
  expect(homeLink).toHaveFocus()
})
