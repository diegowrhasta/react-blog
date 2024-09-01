import './Footer.css'

const links = {
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
        <li onClick={() => onLinkClick(links.linkedIn)}>LinkedIn</li>
        <li onClick={() => onLinkClick(links.email)}>Email</li>
      </ul>
    </div>
  )
}
