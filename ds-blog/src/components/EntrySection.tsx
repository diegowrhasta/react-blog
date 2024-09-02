import './EntrySection.css'

interface EntrySectionProps {
  titleName: string | undefined
  isAllType?: boolean
}

export function EntrySection ({ titleName, isAllType }: EntrySectionProps) {
  const allType = !!isAllType
  const layoutTypeClass = allType ? 'all-container' : 'recent-container'

  return (
    <>
      <span className='title'>{titleName}</span>
      <div className={layoutTypeClass}></div>
    </>
  )
}
