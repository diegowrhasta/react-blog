import { screen, render } from 'testing-library-utils'

import { About } from '../About'

test('sections are accesible', () => {
  render(<About />)

  const aboutMeSection = screen.getByRole('region', { name: /About Me/i })
  const skillsSection = screen.getByRole('region', { name: /Skills/i })
  const experienceSection = screen.getByRole('region', { name: /Experience/i })
  const educationSection = screen.getByRole('region', { name: /Education/i })
  const bannerImage = screen.getByRole('img', { name: /person with glasses/i })
  expect(aboutMeSection).toBeInTheDocument()
  expect(skillsSection).toBeInTheDocument()
  expect(experienceSection).toBeInTheDocument()
  expect(educationSection).toBeInTheDocument()
  expect(bannerImage).toBeInTheDocument()
})
