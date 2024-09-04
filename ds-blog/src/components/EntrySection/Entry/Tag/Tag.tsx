import { LabelInterface } from '../../../../data'

import './Tag.css'

interface TagProps {
  label: LabelInterface
}

export function Tag ({ label }: TagProps) {
  const colorStyle = label.type.toLowerCase()

  return (
    <div key={label.id} className={`tag ${colorStyle}`}>
      {label.label}
    </div>
  )
}
