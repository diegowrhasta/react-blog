import './Footer.css'

const LINKS = {
  linkedIn: 'https://www.linkedin.com/in/ds-balderrama/',
  email: 'mailto:balderrama.quino.diego@gmail.com'
}

export function Footer () {
  function isMobile () {
    return window.matchMedia('(max-width: 390px)').matches
  }

  return (
    <div className='links'>
      <ul>
        {!isMobile() && <li className='static'>© 2024</li>}
        <li>
          <a
            href={LINKS.linkedIn}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn Profile'
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={LINKS.email}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Email Link'
          >
            Email
          </a>
        </li>
        {isMobile() && <li className='static'>© 2024</li>}
      </ul>
    </div>
  )
}
