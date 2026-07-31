import { useId } from 'react'

export type IconProps = {
  name: string
  title?: string
  size?: number
  className?: string
  color?: string
}

const Icon = ({ name, title, size = 24, color, className }: IconProps) => {
  const iconUrl = name ? `/sprite.svg?#${name}` : null

  return iconUrl ? (
    <svg
      width={size}
      height={size}
      color={color}
      className={className}
      aria-hidden={true}
    >
      {title && <title>{title}</title>}
      <use href={iconUrl} />
    </svg>
  ) : null
}

Icon.displayName = 'Icon'

export { Icon }
