import './Title.css'

interface TitleProps {
  title: string
}

export function Title ({ title }: TitleProps) {
  return <div className='title'>{title}</div>
}
