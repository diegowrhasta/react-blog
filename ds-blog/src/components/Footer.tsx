import './Footer.css'

const LINKS = {
  linkedIn: 'https://www.linkedin.com/in/ds-balderrama/',
  email: 'mailto:balderrama.quino.diego@gmail.com'
}

export function Footer () {
  function onLinkClick (link: string) {
    window.open(link, '_blank')
  }

  return (
    <div className='links'>
      <ul>
        <li className='static'>© 2024</li>
        <li onClick={() => onLinkClick(LINKS.linkedIn)}>LinkedIn</li>
        <li onClick={() => onLinkClick(LINKS.email)}>Email</li>
      </ul>
    </div>
  )
}
